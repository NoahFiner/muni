import { useAtomValue } from "jotai";
import { currentStateAtom } from "./atoms";
import { Question1, Question2, Question3 } from "./AllQuestions";

export function QuestionManager() {
  const QUESTIONS_IN_ORDER = [<Question1 />, <Question2 />, <Question3 />];
  const { currentQuestion } = useAtomValue(currentStateAtom);
  return (
    <>
      <div className="outer">{QUESTIONS_IN_ORDER[currentQuestion]}</div>
    </>
  );
}
