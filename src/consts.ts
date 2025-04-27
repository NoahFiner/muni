export type MBTIType = "I" | "E" | "S" | "N" | "T" | "F" | "J" | "P" | "_";

export type Choice = {
  text: string;
  mbti?: MBTIType;
};

type QuestionMetadata = {
  backgroundColor?: string;
  variant?: "dark" | "light" | "warning";
};

export const QUESTION_METADATA: QuestionMetadata[] = [
  {
    backgroundColor: "#111",
  },
  {
    backgroundColor: "#111",
  },
  {
    backgroundColor: "#111",
  },
  {
    backgroundColor: "#111",
  },
  {
    backgroundColor: "#111",
  },
  {
    backgroundColor: "#222",
  },
  {
    backgroundColor: "#333",
  },
  {
    backgroundColor: "#444",
  },
  {
    backgroundColor: "#DE7D02",
    variant: "warning",
  },
  {
    backgroundColor: "#223",
  },
  {
    backgroundColor: "#222",
  },
  {
    backgroundColor: "#444",
  },
  {
    backgroundColor: "#444",
  },
  {
    backgroundColor: "#fff",
    variant: "light",
  },
  {
    backgroundColor: "#444",
  },
  {
    backgroundColor: "#030303",
  },
  {
    backgroundColor: "#030303",
  },
];
