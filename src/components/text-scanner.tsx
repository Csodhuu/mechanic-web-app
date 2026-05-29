"use client";

import Image from "next/image";
import { startTransition, useEffect, useRef, useState } from "react";

type TesseractModule = typeof import("tesseract.js");
type TesseractWorker = Awaited<ReturnType<TesseractModule["createWorker"]>>;

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

export function TextScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const workerRef = useRef<TesseractWorker | null>(null);
  const workerPromiseRef = useRef<Promise<TesseractWorker> | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [capturedImage, setCapturedImage] = useState("");
  const [status, setStatus] = useState("Камераа асаагаад текстээ уншуулна уу.");
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

  async function getWorker() {
    if (workerRef.current) {
      return workerRef.current;
    }

    if (!workerPromiseRef.current) {
      workerPromiseRef.current = import("tesseract.js").then(
        async ({ createWorker }) => {
          const worker = await createWorker("eng", 1, {
            logger: (message) => {
              const percent = Math.round(message.progress * 100);
              setProgressLabel(`${message.status} ${percent}%`);
            },
            errorHandler: (workerError) => {
              console.error(workerError);
            },
          });

          await worker.setParameters({
            preserve_interword_spaces: "1",
          });

          workerRef.current = worker;
          return worker;
        },
      );
    }

    return workerPromiseRef.current;
  }

  useEffect(() => {
    return () => {
      stopCamera();
      revokePreviewUrl();
      void workerRef.current?.terminate();
      workerRef.current = null;
      workerPromiseRef.current = null;
    };
  }, []);

  async function attachStream(stream: MediaStream) {
    streamRef.current = stream;

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    setCameraActive(true);
    setStatus(
      'Камер бэлэн. Текстээ кадрт оруулаад "Текст унших" товчийг дарна уу.',
    );
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
            `Арын камер шууд сонгогдоогүй тул боломжит камераар нээлээ. (${preferredError.name})`,
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
      setProgressLabel("OCR бэлдэж байна...");

      const worker = await getWorker();
      const {
        data: { text },
      } = await worker.recognize(image);

      startTransition(() => {
        const normalized = text.trim();
        setRecognizedText(normalized);
        setStatus(
          normalized
            ? "Текст амжилттай уншигдлаа."
            : "Текст илрээгүй байна. Илүү тод зураг ашиглаад дахин оролдоно уу.",
        );
      });
    } catch (scanError) {
      console.error(scanError);
      setError(
        "OCR ажиллах үед алдаа гарлаа. Сүлжээ болон зурагны чанараа шалгана уу.",
      );
      setStatus("Текст уншиж чадсангүй.");
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
      setError(
        "Камерын дүрс бүрэн ачаалагдаагүй байна. 1-2 секунд хүлээгээд дахин оролдоно уу.",
      );
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
            Камер ашиглан текст унших
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
              Галерей дахь зурганаас текст унших боломжтой.
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
                OCR ажиллуулах үед энд авсан зураг харагдана.
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
          Зөвлөмж: бичиг тод, гэрэл сайн, камер тогтвортой байвал OCR илүү сайн
          ажиллана.
        </p>
      </div>
    </section>
  );
}
