import { useAtomValue, useSetAtom } from "jotai";
import { currentBackgroundColorAtom, currentStateAtom } from "./atoms";
import muni from "./assets/img/muni.svg";
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
import Results from "./Results";
import { useCallback } from "react";
import Intro from "./Intro";

export function QuestionManager() {
  const QUESTIONS_IN_ORDER = [
    <></>,
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
  const setCurrentState = useSetAtom(currentStateAtom);

  const backgroundColor = useAtomValue(currentBackgroundColorAtom);

  const onClickBack = useCallback(
    () =>
      setCurrentState((prev) => {
        if (prev.currentQuestion === 0) {
          return prev;
        }
        prev.mbtis.pop();
        return {
          currentQuestion: prev.currentQuestion - 1,
          mbtis: prev.mbtis,
        };
      }),
    [setCurrentState]
  );

  if (currentQuestion >= QUESTIONS_IN_ORDER.length) {
    return <Results />;
  }

  if (currentQuestion === 0) {
    return <Intro />;
  }

  return (
    <>
      <div
        className="outer"
        style={{ transition: "background-color 1s", backgroundColor }}
      >
        {QUESTIONS_IN_ORDER[currentQuestion]}
        <div className="footerOuter">
          {currentQuestion > 0 && (
            <button className="back" onClick={onClickBack}>
              <Back />
            </button>
          )}
          <img src={muni} className="muni" />
        </div>
      </div>
    </>
  );
}

function Back() {
  const color = "#CC3847"; //useAtomValue(currentTextColorAtom);
  return (
    <svg
      className="back"
      width="33"
      height="37"
      viewBox="0 0 33 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.9266 9.95312C19.9695 10.5901 18.0586 12.501 16.4502 13.8438C15.1425 14.9355 13.8911 15.8171 12.8748 16.9374C12.3668 17.4974 11.6473 17.952 11.3256 18.485C10.6848 19.5466 13.8783 20.1894 16.0101 22.2684C18.0394 24.0305 19.643 25.5285 20.2816 26.007C20.6033 26.2743 20.9202 26.5911 21.2467 26.9176"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M22.9809 34.566C25.8517 34.1843 27.5399 33.6917 28.4044 32.6054C28.8921 32.0084 29.2507 31.3618 29.4353 30.6464C29.8708 28.9582 32.4075 27.0925 30.6831 15.8359C29.8577 10.4484 28.0204 5.19874 25.3966 3.72822C21.1476 1.34679 18.2985 1.30568 16.432 1.72847C14.7471 2.11015 12.351 1.95682 10.5062 3.30902C8.87511 4.50462 7.49383 5.74196 6.2115 7.3346C4.63422 9.29356 2.91701 10.6377 2.40938 12.4449C1.92005 14.1869 1.46123 17.0576 2.0326 19.6234C2.4681 21.5791 2.88001 23.3243 3.60988 25.7678C4.21013 27.7773 5.2881 29.6268 7.52944 30.9286C9.21438 31.9073 10.7831 33.0369 12.8028 33.4813C14.5448 33.8646 16.3386 35.4491 22.9809 34.566Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
