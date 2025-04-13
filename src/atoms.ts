import { atom } from "jotai";
type CurrentState = {
  currentQuestion: number;
};
export const currentStateAtom = atom<CurrentState>({ currentQuestion: 0 });
