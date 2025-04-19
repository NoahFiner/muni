import { atom } from "jotai";
import { QUESTION_METADATA } from "./consts";
type CurrentState = {
  currentQuestion: number;
};

export const currentStateAtom = atom<CurrentState>({ currentQuestion: 0 });

export const currentBackgroundColorAtom = atom(
  (get) =>
    QUESTION_METADATA[get(currentStateAtom).currentQuestion].backgroundColor ||
    "#000"
);

export const currentTextColorAtom = atom((get) => {
  const variant =
    QUESTION_METADATA[get(currentStateAtom).currentQuestion].variant;
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
    QUESTION_METADATA[get(currentStateAtom).currentQuestion].variant;
  switch (variant) {
    case "warning":
      return "#0D306C";
    case "light":
      return "#0D306C";
    default:
      return "#D08F26";
  }
});
