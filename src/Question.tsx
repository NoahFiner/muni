import TopBarSvg from "./assets/topBar";
import "./Question.css";
import questionBox from "./assets/question-box-no-border.svg";
import muni from "./assets/img/muni.svg";
import TransitBottom from "./assets/transit";
import DrawnLine from "./assets/Line";
import { useCallback } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { currentStateAtom, currentTextColorAtom } from "./atoms";
import { Choice, MBTIType } from "./consts";

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

function ChoiceContent({ text }: { text: string }) {
  const textColor = useAtomValue(currentTextColorAtom);
  return (
    <>
      <p style={{ color: textColor, transition: "color 1s" }}>{text}</p>
      <div className="drawn-line">
        <DrawnLine strokeColor={textColor} />
      </div>
    </>
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
  paragraphs?: string[];
  option1: Choice;
  option2: Choice;
  children?: React.ReactElement;
}) {
  const setCurrentState = useSetAtom(currentStateAtom);

  const onClick = useCallback(
    (mbti?: MBTIType) => {
      setCurrentState((prev) => {
        const nextMBTI = { ...prev.mbti };
        if (mbti) {
          nextMBTI[mbti] = prev.mbti[mbti] + 1;
        }
        return {
          currentQuestion: prev.currentQuestion + 1,
          mbti: nextMBTI,
        };
      });
    },
    [setCurrentState]
  );

  return (
    <div className="app-container">
      <TopBar number={number} title={title} />

      {children}

      <div className="bottom-aligned">
        {/* Text Box */}
        {paragraphs && <QuestionBox paragraphs={paragraphs} />}
        <div className="transit-bottom-outer">
          <TransitBottom />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button
            className="option-button"
            onClick={() => onClick(option1.mbti)}
          >
            <ChoiceContent text={option1.text} />
          </button>
          <button
            className="option-button"
            onClick={() => onClick(option2.mbti)}
          >
            <ChoiceContent text={option2.text} />
          </button>
        </div>

        <img src={muni} className="muni" />
      </div>
    </div>
  );
}
