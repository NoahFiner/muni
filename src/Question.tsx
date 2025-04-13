import TopBarSvg from "./assets/topBar";
import "./Question.css";
import questionBox from "./assets/question-box-no-border.svg";
import muni from "./assets/img/muni.png";
import TransitBottom from "./assets/transit";
import DrawnLine from "./assets/Line";
import { useCallback } from "react";
import { useSetAtom } from "jotai";
import { currentStateAtom } from "./atoms";

function TopBar({ number, title }: { number: number; title: string }) {
  return (
    <div className="header-container">
      <div className="container-outer">
        <p className="header-number">{number}</p>
        <p className="header-title">{title}</p>
      </div>
      <TopBarSvg />
    </div>
  );
}

function QuestionBox({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="question-container">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx}>{paragraph}</p>
      ))}
      <img src={questionBox} />
    </div>
  );
}

export type MBTIType = "I" | "E" | "S" | "N" | "T" | "F" | "J" | "P";

export type Choice = {
  text: string;
  mbti?: MBTIType;
};

export default function Question({
  number,
  title,
  paragraphs,
  option1,
  option2,
  children,
}: {
  number: number;
  title: string;
  paragraphs: string[];
  option1: Choice;
  option2: Choice;
  children?: React.ReactElement;
}) {
  const setCurrentState = useSetAtom(currentStateAtom);

  const onClick = useCallback(
    (mbti?: MBTIType) => {
      setCurrentState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
      }));
    },
    [setCurrentState]
  );

  return (
    <div className="app-container">
      <TopBar number={number} title={title} />

      {children}

      {/* Text Box */}
      <QuestionBox paragraphs={paragraphs} />

      <div className="bottom-aligned">
        <div className="transit-bottom-outer">
          <TransitBottom />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            className="option-button"
            onClick={() => onClick(option1.mbti)}
          >
            <p>{option1.text}</p>
            <div className="drawn-line">
              <DrawnLine />
            </div>
          </button>
          <button
            className="option-button"
            onClick={() => onClick(option2.mbti)}
          >
            <p>{option2.text}</p>
            <div className="drawn-line">
              <DrawnLine />
            </div>
          </button>
        </div>

        <img src={muni} className="muni" />
      </div>
    </div>
  );
}
