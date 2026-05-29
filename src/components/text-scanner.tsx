"use client";

import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";

type CropRegion = {
  height: number;
  width: number;
  x: number;
  y: number;
};

type PaddleOcrResultItem = {
  score?: number;
  text?: string;
};

type PaddleOcrResult = {
  items?: PaddleOcrResultItem[];
};

type PaddleOcrInstance = {
  dispose?: () => Promise<void> | void;
  predict: (
    input: Blob | HTMLCanvasElement,
    params?: Record<string, unknown>,
  ) => Promise<PaddleOcrResult[]>;
};

type RecognitionTarget = {
  blob: Blob;
  previewUrl: string;
  weight: number;
};

type CandidateScore = {
  previewUrl: string;
  score: number;
};
const importRemoteModule = new Function(
  "specifier",
  "return import(specifier)",
) as (specifier: string) => Promise<{
  PaddleOCR: {
    create: (options: Record<string, unknown>) => Promise<PaddleOcrInstance>;
  };
}>;

const CYRILLIC_LOOKALIKES: Record<string, string> = {
  A: "А",
  B: "В",
  C: "С",
  E: "Е",
  H: "Н",
  K: "К",
  M: "М",
  O: "О",
  P: "Р",
  T: "Т",
  X: "Х",
  Y: "У",
};

const DIGIT_LOOKALIKES: Record<string, string> = {
  B: "8",
  D: "0",
  G: "6",
  I: "1",
  L: "1",
  O: "0",
  Q: "0",
  S: "5",
  Z: "2",
};

function getCameraErrorMessage(error: unknown) {
  if (!(error instanceof DOMException)) {
    return "Камер нээх үед үл мэдэгдэх алдаа гарлаа.";
  }

  switch (error.name) {
    case "NotAllowedError":
      return "Камерын permission хаалттай байна. Browser settings дээр camera access-аа зөвшөөрнө үү.";
    case "NotFoundError":
      return "Камер төхөөрөмж олдсонгүй.";
    case "NotReadableError":
      return "Камерыг өөр апп ашиглаж байгаа тул нээж чадсангүй.";
    case "OverconstrainedError":
      return "Сонгосон камерын тохиргоо энэ төхөөрөмж дээр дэмжигдэхгүй байна.";
    case "SecurityError":
      return "Камер зөвхөн secure context дээр ажиллана. `https` эсвэл `localhost` ашиглана уу.";
    default:
      return `Камер нээхэд алдаа гарлаа: ${error.name}`;
  }
}

function normalizePlateCandidate(candidate: string) {
  const compact = candidate
    .toUpperCase()
    .replace(/[^0-9A-ZА-ЯӨҮЁ]/gu, "");

  if (compact.length < 7) {
    return null;
  }

  for (let index = 0; index <= compact.length - 7; index += 1) {
    const slice = compact.slice(index, index + 7).split("");
    const digits = slice.slice(0, 4).map((char) => {
      if (/\d/.test(char)) {
        return char;
      }

      return DIGIT_LOOKALIKES[char] ?? char;
    });
    const letters = slice.slice(4).map((char) => {
      if (/[А-ЯӨҮЁ]/u.test(char)) {
        return char;
      }

      return CYRILLIC_LOOKALIKES[char] ?? char;
    });
    const normalized = `${digits.join("")}${letters.join("")}`;

    if (/^\d{4}[А-ЯӨҮЁ]{3}$/u.test(normalized)) {
      return normalized;
    }
  }

  return null;
}

function extractPlateCandidates(input: string) {
  const normalized = input
    .toUpperCase()
    .replace(/[\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return [];
  }

  const candidates = new Set<string>();
  const directMatches = normalized.match(/\d{4}\s*[A-ZА-ЯӨҮЁ]{3}/gu) ?? [];

  for (const match of directMatches) {
    const candidate = normalizePlateCandidate(match);
    if (candidate) {
      candidates.add(candidate);
    }
  }

  const compact = normalized.replace(/\s+/g, "");
  const compactCandidate = normalizePlateCandidate(compact);
  if (compactCandidate) {
    candidates.add(compactCandidate);
  }

  return [...candidates];
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
}

async function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png") {
  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type);
  });
}

function blobToDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Could not convert blob to data URL."));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

async function loadSourceImage(source: Blob | File) {
  if ("createImageBitmap" in window) {
    return createImageBitmap(source);
  }

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    const imageUrl = URL.createObjectURL(source);
    image.onload = () => {
      URL.revokeObjectURL(imageUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Image could not be loaded."));
    };
    image.src = imageUrl;
  });
}

function getCropRegions(width: number, height: number): CropRegion[] {
  const isPortrait = height / width > 1.2;

  if (isPortrait) {
    return [
      { x: 0.08, y: 0.2, width: 0.84, height: 0.48 },
      { x: 0.1, y: 0.28, width: 0.8, height: 0.34 },
      { x: 0.12, y: 0.33, width: 0.76, height: 0.24 },
      { x: 0.14, y: 0.37, width: 0.72, height: 0.18 },
      { x: 0, y: 0, width: 1, height: 1 },
    ];
  }

  return [
    { x: 0.08, y: 0.2, width: 0.84, height: 0.42 },
    { x: 0.1, y: 0.26, width: 0.8, height: 0.28 },
    { x: 0.12, y: 0.31, width: 0.76, height: 0.2 },
    { x: 0.14, y: 0.34, width: 0.72, height: 0.16 },
    { x: 0, y: 0, width: 1, height: 1 },
  ];
}

function applyContrastVariant(
  source: HTMLCanvasElement,
  mode: "raw" | "grayscale" | "binary",
) {
  const canvas = createCanvas(source.width, source.height);
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    return canvas;
  }

  context.drawImage(source, 0, 0);

  if (mode === "raw") {
    return canvas;
  }

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const { data } = imageData;

  for (let index = 0; index < data.length; index += 4) {
    const grayscale =
      data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;

    if (mode === "grayscale") {
      const boosted = Math.max(0, Math.min(255, (grayscale - 110) * 1.65 + 128));
      data[index] = boosted;
      data[index + 1] = boosted;
      data[index + 2] = boosted;
      continue;
    }

    const binary = grayscale > 150 ? 255 : 0;
    data[index] = binary;
    data[index + 1] = binary;
    data[index + 2] = binary;
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}

async function buildRecognitionTargets(source: Blob | File) {
  const image = await loadSourceImage(source);
  const width = "naturalWidth" in image ? image.naturalWidth : image.width;
  const height = "naturalHeight" in image ? image.naturalHeight : image.height;
  const targets: RecognitionTarget[] = [];

  for (const [index, region] of getCropRegions(width, height).entries()) {
    const sourceX = Math.floor(width * region.x);
    const sourceY = Math.floor(height * region.y);
    const cropWidth = Math.max(1, Math.floor(width * region.width));
    const cropHeight = Math.max(1, Math.floor(height * region.height));
    const scale = Math.max(2, Math.ceil(1600 / cropWidth));
    const cropCanvas = createCanvas(cropWidth * scale, cropHeight * scale);
    const cropContext = cropCanvas.getContext("2d");

    if (!cropContext) {
      continue;
    }

    cropContext.drawImage(
      image,
      sourceX,
      sourceY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropCanvas.width,
      cropCanvas.height,
    );

    const variants: Array<"raw" | "grayscale" | "binary"> = [
      "raw",
      "grayscale",
      "binary",
    ];

    for (const [variantIndex, variant] of variants.entries()) {
      const variantCanvas = applyContrastVariant(cropCanvas, variant);
      const blob = await canvasToBlob(variantCanvas);

      if (!blob) {
        continue;
      }

      targets.push({
        blob,
        previewUrl: await blobToDataUrl(blob),
        weight: Math.max(1, 6 - index * 1.1 - variantIndex * 0.35),
      });
    }
  }

  if ("close" in image) {
    image.close();
  }

  return targets;
}

export function TextScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const ocrRef = useRef<PaddleOcrInstance | null>(null);
  const ocrPromiseRef = useRef<Promise<PaddleOcrInstance> | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [capturedImage, setCapturedImage] = useState("");
  const [status, setStatus] = useState("Камераа асаагаад дугаар руу чиглүүлнэ үү.");
  const [progressLabel, setProgressLabel] = useState("");
  const [isStartingCamera, setIsStartingCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");

  function revokePreviewUrl() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraActive(false);
    setStatus("Камер унтарсан байна.");
  }

  async function getOcr() {
    if (ocrRef.current) {
      return ocrRef.current;
    }

    if (!ocrPromiseRef.current) {
      ocrPromiseRef.current = importRemoteModule(
        "/vendor/paddleocr/index.mjs",
      ).then(async ({ PaddleOCR }) => {
          const ocr = (await PaddleOCR.create({
            lang: "en",
            ocrVersion: "PP-OCRv5",
            ortOptions: {
              backend: "wasm",
              numThreads: 1,
              simd: true,
              wasmPaths: "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/",
            },
          })) as PaddleOcrInstance;

          ocrRef.current = ocr;
          return ocr;
        });
    }

    return ocrPromiseRef.current;
  }

  useEffect(() => {
    return () => {
      stopCamera();
      revokePreviewUrl();
      void ocrRef.current?.dispose?.();
      ocrRef.current = null;
      ocrPromiseRef.current = null;
    };
  }, []);

  async function attachStream(stream: MediaStream) {
    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    setCameraActive(true);
    setStatus('Камер бэлэн. Дугаарыг хүрээнд тааруулаад "Текст унших" товч дарна уу.');
  }

  async function startCamera() {
    if (!window.isSecureContext) {
      setError("Камер зөвхөн `https` эсвэл `localhost` дээр ажиллана.");
      setStatus("Secure context шаардлагатай.");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Энэ төхөөрөмж камерын API дэмжихгүй байна.");
      setStatus("Камерын API олдсонгүй.");
      return;
    }

    try {
      setIsStartingCamera(true);
      setError("");
      setStatus("Камерт холбогдож байна...");
      stopCamera();

      try {
        const preferredStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: "environment" },
          },
          audio: false,
        });

        await attachStream(preferredStream);
      } catch (preferredError) {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        await attachStream(fallbackStream);

        if (preferredError instanceof DOMException) {
          setStatus(
            `Арын камер шууд сонгогдсонгүй тул боломжит камераар нээлээ. (${preferredError.name})`,
          );
        }
      }
    } catch (cameraError) {
      console.error(cameraError);
      setError(getCameraErrorMessage(cameraError));
      setStatus("Камер нээгдээгүй байна.");
    } finally {
      setIsStartingCamera(false);
    }
  }

  async function runRecognition(
    image: Blob | File,
    previewSource: string,
    sourceLabel: string,
  ) {
    try {
      setIsScanning(true);
      setError("");
      setRecognizedText("");
      setCapturedImage(previewSource);
      setStatus(`${sourceLabel} OCR ажиллуулж байна...`);
      setProgressLabel("OCR хөдөлгүүр ачаалж байна...");

      const ocr = await getOcr();
      const targets = await buildRecognitionTargets(image);
      const candidateScores = new Map<string, CandidateScore>();

      for (const [index, target] of targets.entries()) {
        setProgressLabel(`OCR оролдлого ${index + 1}/${targets.length}`);

        const [result] = await ocr.predict(target.blob, {
          textDetLimitSideLen: 960,
          textDetBoxThresh: 0.45,
          textDetUnclipRatio: 1.8,
          textRecScoreThresh: 0,
        });

        const texts = (result.items ?? [])
          .map((item) => item.text?.trim() ?? "")
          .filter(Boolean);
        const merged = texts.join(" ");
        const candidates = new Set<string>([
          ...extractPlateCandidates(merged),
          ...texts.flatMap((text) => extractPlateCandidates(text)),
        ]);

        for (const candidate of candidates) {
          const itemScore =
            (result.items ?? []).reduce((sum, item) => sum + (item.score ?? 0.7), 0) ||
            0.7;
          const score = itemScore * target.weight;
          const current = candidateScores.get(candidate);

          if (current) {
            current.score += score;
            continue;
          }

          candidateScores.set(candidate, {
            previewUrl: target.previewUrl,
            score,
          });
        }
      }

      const winner = [...candidateScores.entries()].sort(
        (left, right) => right[1].score - left[1].score,
      )[0];

      startTransition(() => {
        const normalized = winner?.[0] ?? "";
        setRecognizedText(normalized);
        setCapturedImage(winner?.[1].previewUrl ?? previewSource);
        setStatus(
          normalized
            ? "Дугаар амжилттай уншигдлаа."
            : "Дугаар илрээгүй байна. Дугаарыг ойртуулж, хүрээний төвд байлгаад дахин оролдоно уу.",
        );
      });
    } catch (scanError) {
      console.error(scanError);
      setError("OCR ажиллах үед алдаа гарлаа. Сүлжээ болон зурагны чанараа шалгана уу.");
      setStatus("Дугаар уншиж чадсангүй.");
    } finally {
      setProgressLabel("");
      setIsScanning(false);
    }
  }

  async function scanCurrentFrame() {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !cameraActive) {
      setError("Эхлээд камераа асаана уу.");
      return;
    }

    if (
      video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA ||
      !video.videoWidth
    ) {
      setError("Камерын дүрс бүрэн ачаалагдаагүй байна. 1-2 секунд хүлээгээд дахин оролдоно уу.");
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Canvas context үүсгэж чадсангүй.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const previewSource = canvas.toDataURL("image/jpeg", 0.92);
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", 0.92);
    });

    if (!blob) {
      setError("Зураг үүсгэж чадсангүй.");
      return;
    }

    await runRecognition(blob, previewSource, "Авсан зураг");
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    revokePreviewUrl();
    const previewSource = URL.createObjectURL(file);
    previewUrlRef.current = previewSource;

    await runRecognition(file, previewSource, "Сонгосон зураг");
    event.target.value = "";
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="overflow-hidden rounded-[2rem] border border-white/55 bg-white/75 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="border-b border-slate-200/80 px-5 py-4 sm:px-6">
          <p className="text-sm font-semibold text-slate-900">
            Камер ашиглан дугаар унших
          </p>
          <p className="mt-1 text-sm text-slate-600">{status}</p>
          {progressLabel ? (
            <p className="mt-1 text-xs font-medium text-cyan-700">
              {progressLabel}
            </p>
          ) : null}
        </div>

        <div className="p-4 sm:p-6">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-slate-950 sm:aspect-video">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              autoPlay
              muted
              playsInline
            />

            {!cameraActive && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/90 px-6 text-center text-sm text-slate-200">
                Камер асаасны дараа энд бодит дүрс харагдана.
              </div>
            )}

            <div className="pointer-events-none absolute inset-[10%] rounded-[1.25rem] border-2 border-cyan-300/80 shadow-[0_0_0_999px_rgba(2,6,23,0.34)]" />
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={cameraActive ? stopCamera : startCamera}
              disabled={isStartingCamera || isScanning}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {cameraActive
                ? "Камер унтраах"
                : isStartingCamera
                  ? "Камер нээж байна..."
                  : "Камер нээх"}
            </button>

            <button
              type="button"
              onClick={scanCurrentFrame}
              disabled={!cameraActive || isScanning}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-cyan-500 px-5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-cyan-200"
            >
              {isScanning ? "Уншиж байна..." : "Текст унших"}
            </button>
          </div>

          <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-sm text-slate-600 transition hover:border-cyan-400 hover:bg-cyan-50">
            <span className="font-medium text-slate-900">
              Эсвэл зураг сонгож OCR ажиллуулах
            </span>
            <span className="mt-1">
              Галерей дахь зурагнаас Монгол улсын машины дугаар уншина.
            </span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {error ? (
            <p className="mt-4 text-sm font-medium text-rose-600">{error}</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white px-5 py-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600">
              OCR Result
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Уншигдсан текст
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {recognizedText ? `${recognizedText.length} тэмдэгт` : "хоосон"}
          </span>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50">
            {capturedImage ? (
              <div className="relative h-52 w-full">
                <Image
                  src={capturedImage}
                  alt="Captured preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-52 items-center justify-center px-4 text-center text-sm text-slate-500">
                OCR ажиллуулах үед энд дугаарын crop зураг харагдана.
              </div>
            )}
          </div>

          <textarea
            value={recognizedText}
            onChange={(event) => setRecognizedText(event.target.value)}
            placeholder="Танигдсан текст энд гарч ирнэ."
            className="min-h-72 w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition focus:border-cyan-400 focus:bg-white"
          />
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Зөвлөмж: дугаарыг хүрээний төвд, тод гэрэлтэй, хөдөлгөөнгүй баривал OCR илүү зөв ажиллана.
        </p>
      </div>
    </section>
  );
}
