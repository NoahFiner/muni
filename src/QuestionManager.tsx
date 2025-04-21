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
  Question15,
  Question16,
  Question17,
} from "./AllQuestions";
import Results from "./results";

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
    <Question15 />,
    <Question16 />,
    <Question17 />,
  ];
  const { currentQuestion } = useAtomValue(currentStateAtom);

  const backgroundColor = useAtomValue(currentBackgroundColorAtom);

  if (currentQuestion >= QUESTIONS_IN_ORDER.length) {
    return (
      <div className="outer" style={{ backgroundColor: "#333" }}>
        <Results />
      </div>
    );
  }

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
