import { useAtomValue } from "jotai";
import { currentBackgroundColorAtom, currentStateAtom } from "./atoms";
import {
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  Question6,
  Question7,
  Question8,
  Question9,
  Question10,
  Question11,
  Question12,
  Question13,
  Question14,
} from "./AllQuestions";

export function QuestionManager() {
  const QUESTIONS_IN_ORDER = [
    <Question1 />,
    <Question2 />,
    <Question3 />,
    <Question4 />,
    <Question5 />,
    <Question6 />,
    <Question7 />,
    <Question8 />,
    <Question9 />,
    <Question10 />,
    <Question11 />,
    <Question12 />,
    <Question13 />,
    <Question14 />,
  ];
  const { currentQuestion } = useAtomValue(currentStateAtom);

  const backgroundColor = useAtomValue(currentBackgroundColorAtom);

  return (
    <>
      <div
        className="outer"
        style={{ transition: "background-color 1s", backgroundColor }}
      >
        {QUESTIONS_IN_ORDER[currentQuestion]}
      </div>
    </>
  );
}
