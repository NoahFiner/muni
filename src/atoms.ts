import { atom } from "jotai";
import { MBTIType, QUESTION_METADATA } from "./consts";

export type MBTIScore = { [key in MBTIType]: number };

const INITIAL_MBTI_SCORE: MBTIScore = {
  I: 0,
  E: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
};

type CurrentState = {
  currentQuestion: number;
  mbti: MBTIScore;
};

export const currentStateAtom = atom<CurrentState>({
  currentQuestion: 0,
  mbti: INITIAL_MBTI_SCORE,
});

export const currentBackgroundColorAtom = atom(
  (get) =>
    QUESTION_METADATA[get(currentStateAtom).currentQuestion]?.backgroundColor ||
    "#000"
);

export const currentTextColorAtom = atom((get) => {
  const variant =
    QUESTION_METADATA[get(currentStateAtom).currentQuestion]?.variant;
  switch (variant) {
    case "warning":
      return "#fff";
    case "light":
      return "#0D306C";
    default:
      return "#fcf5e0";
  }
});

export const currentTransitDecalColor = atom((get) => {
  const variant =
    QUESTION_METADATA[get(currentStateAtom).currentQuestion]?.variant;
  switch (variant) {
    case "warning":
      return "#0D306C";
    case "light":
      return "#0D306C";
    default:
      return "#D08F26";
  }
});
