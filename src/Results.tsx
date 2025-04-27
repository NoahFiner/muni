import { useAtomValue, useSetAtom } from "jotai";
import React, { useCallback } from "react";
import { currentStateAtom, MBTIScore } from "./atoms";
import { MBTIType } from "./consts";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import "./Results.css";

import ncontent from "./assets/results/the-n/content.png";
import nticket from "./assets/results/the-n/ticket.png";
import ntitle from "./assets/results/the-n/title.png";
import againButton from "./assets/results/again.png";
import saveButton from "./assets/results/save.png";

const INITIAL_MBTI_SCORE: MBTIScore = {
  I: 0,
  E: 0,
  S: 0,
  N: 0,
  T: 0,
  F: 0,
  J: 0,
  P: 0,
  _: 0,
};

const arrayToScore = (mbtis: MBTIType[]): MBTIScore => {
  return mbtis.reduce((acc, cur) => {
    acc[cur]++;
    return acc;
  }, INITIAL_MBTI_SCORE);
};

const actualMBTI = (mbti: MBTIScore) => {
  let result = "";

  result += mbti["I"] > mbti["E"] ? "I" : "E";
  result += mbti["S"] > mbti["N"] ? "S" : "N";
  result += mbti["T"] > mbti["F"] ? "T" : "F";
  result += mbti["J"] > mbti["P"] ? "J" : "P";

  return result;
};

const Results: React.FC = () => {
  const { mbtis } = useAtomValue(currentStateAtom);
  const setCurrentState = useSetAtom(currentStateAtom);
  const mbtiScores = arrayToScore(mbtis);
  const mbtiString = actualMBTI(mbtiScores);

  const clear = useCallback(() => {
    setCurrentState({
      currentQuestion: 0,
      mbtis: [],
    });
  }, [setCurrentState]);

  const save = useCallback(() => {
    const node = document.getElementById("results-save");
    if (node) {
      htmlToImage
        .toPng(node)
        .then((dataUrl) => download(dataUrl, "transit.png"));
    }
  }, []);

  return (
    <div className="results-outer">
      <div id="results-save">
        <div className="results-header">
          <img src={ntitle} className="results-title" />
          <div className="ticket-animation">
            <div className="ticket-wobble-animation">
              <div className="ticket-outer">
                <img src={nticket} />
                <p>asdf</p>
              </div>
            </div>
          </div>
        </div>
        <img src={ncontent} className="results-content" />
      </div>
      <div className="results-buttons">
        <img src={saveButton} onClick={save} />
        <img src={againButton} onClick={clear} />
      </div>
      <div style={{ width: "80vw" }}>
        <h2>debug</h2>
        <p>{mbtiString}</p>
        <p style={{ wordBreak: "break-all" }}>{JSON.stringify(mbtiScores)}</p>
      </div>
    </div>
  );
};

export default Results;
