import { useAtomValue } from "jotai";
import React from "react";
import { currentStateAtom, MBTIScore } from "./atoms";

const actualMBTI = (mbti: MBTIScore) => {
  let result = "";

  result += mbti["I"] > mbti["E"] ? "I" : "E";
  result += mbti["S"] > mbti["N"] ? "S" : "N";
  result += mbti["T"] > mbti["F"] ? "T" : "F";
  result += mbti["J"] > mbti["P"] ? "J" : "P";

  return result;
};

const Results: React.FC = () => {
  const { mbti } = useAtomValue(currentStateAtom);
  const mbtiString = actualMBTI(mbti);

  return (
    <div className="results-outer">
      <h2>Congrats you are a</h2>
      <h1>{mbtiString}</h1>
      <pre>{JSON.stringify(mbti, null, 2)}</pre>
    </div>
  );
};

export default Results;
