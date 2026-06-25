export type ChecklistStatus = "Regular" | "Warning" | "Danger";

export type ChecklistValue = {
  question: string;
  answer: ChecklistStatus | "";
  description: string;
};

export type ChecklistGroup = {
  type: "General" | "Technical";
  values: ChecklistValue[];
};

const generalQuestions = [
  "Бүх талын цонх бүрэн бүтэн эсэх",
  "Бүх талын гэрэлтүүлэг хэвийн эсэх",
  "Шил арчигчийн механизм, шил арчигч хэвийн эсэх",
  "Хаалга, түгжээний ажиллагаа хэвийн эсэх",
  "Урд хойд гупер хэвийн эсэх",
  "Бүх талын толь хэвийн эсэх",
  "Суудлын бүс ашиглах боломжтой эсэх /Жолооч ба зорчигч/",
  "Дуут дохионы ажиллагаа хэвийн эсэх",
  "Кабин дотор орчин, суудлын бүрээс, шалавч, тааз, хаалганы хавтас цэвэрхэн эсэх",
  "Жолоочийн хариуцлагын албан журмын даатгалтай эсэх /заавал байх шаардлагатай/",
];

const technicalQuestions = [
  "Амортизаторын харагдах байдал хэвийн эсэх",
  "Амортизаторын втулка болон бэхэлгээ хэвийн эсэх",
  "Амортизаторын таваг болон дээд бэхэлгээ хэвийн эсэх",
  "Пүрш хэвийн эсэх",
  "Яндан, гарах хоолой болон холбоосууд хэвийн эсэх",
  "Тулгуур эд анги болон холбоосууд хэвийн эсэх",
  "Рулийн аппарат болон залах эд анги хэвийн эсэх",
  "Масло, хөргөлтийн шингэн, түлш алдагдалгүй хэвийн эсэх",
];

const toValues = (questions: string[]): ChecklistValue[] =>
  questions.map((question) => ({ question, answer: "", description: "" }));

export const createInitialInspectionChecklist = (): ChecklistGroup[] => [
  { type: "General", values: toValues(generalQuestions) },
  { type: "Technical", values: toValues(technicalQuestions) },
];
