import { atom } from "jotai";
type CurrentState = {
  currentQuestion: number;
};

// i fucked up indexing but don't care enough lol
// index 5 = question 6
const QUESTION_INDEX_TO_BACKGROUND: { [key: number]: string } = {
  5: "#222",
};

export const currentStateAtom = atom<CurrentState>({ currentQuestion: 0 });

export const currentBackgroundColorAtom = atom(
  (get) =>
    QUESTION_INDEX_TO_BACKGROUND[get(currentStateAtom).currentQuestion] ||
    "#000"
);
