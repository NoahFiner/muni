import { atom } from "jotai";
import { MBTIType, QUESTION_METADATA } from "./consts";
import { atomWithStorage } from "jotai/utils";

export type MBTIScore = { [key in MBTIType]: number };

type CurrentState = {
  currentQuestion: number;
  mbtis: MBTIType[];
};

export const currentStateAtom = atomWithStorage<CurrentState>("currentState", {
  currentQuestion: 0,
  mbtis: [],
});

export const currentBackgroundColorAtom = atom(
  (get) =>
    QUESTION_METADATA[get(currentStateAtom).currentQuestion]?.backgroundColor ||
    "#000",
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

// export const hasSubmittedStatsAtom = atomWithStorage<boolean>(
//   "hasSubmittedStats",
//   false,
// );
export const hasSubmittedStatsAtom = atom<boolean>(false);

export const quizStartTimeAtom = atom<number | null>(null);
