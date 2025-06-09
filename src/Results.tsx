import { useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect, useState } from "react";
import { currentStateAtom, MBTIScore } from "./atoms";
import { MBTIType } from "./consts";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";
import "./Results.css";

import loadingTag from "./assets/img/loading.png";
import spinner from "./assets/img/spinner.png";
import againButton from "./assets/results/again.png";
import saveButton from "./assets/results/save.png";
import { usePreloadSomeImages } from "./imagePreloading";
import { useAnimatedValue } from "./hooks";
import { AnimatePresence, motion } from "motion/react";

type FinalResultId =
  | "7"
  | "22"
  | "33"
  | "38r"
  | "49"
  | "1"
  | "bike-share"
  | "cable-car"
  | "caltrain"
  | "ferry"
  | "red-bart"
  | "the-j"
  | "the-l"
  | "the-n"
  | "the-t"
  | "yellow-bart";

type Personality =
  | "INTJ"
  | "INTP"
  | "ENTJ"
  | "ENTP"
  | "INFJ"
  | "INFP"
  | "ENFJ"
  | "ENFP"
  | "ISTJ"
  | "ISFJ"
  | "ESTJ"
  | "ESFJ"
  | "ISTP"
  | "ISFP"
  | "ESTP"
  | "ESFP";

const personalityToFinalResultId: { [key in Personality]: FinalResultId } = {
  INTJ: "the-n",
  INTP: "caltrain",
  ENTJ: "22",
  ENTP: "49",
  INFJ: "the-l",
  INFP: "red-bart",
  ENFJ: "7",
  ENFP: "ferry",
  ISTJ: "38r",
  ISFJ: "33",
  ESTJ: "the-t",
  ESFJ: "the-j",
  ISTP: "bike-share",
  ISFP: "cable-car",
  ESTP: "yellow-bart",
  ESFP: "1",
};

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
  return mbtis.reduce(
    (acc, cur) => {
      acc[cur]++;
      return acc;
    },
    { ...INITIAL_MBTI_SCORE },
  );
};

const actualMBTI = (mbti: MBTIScore) => {
  let result = "";

  result += mbti["I"] > mbti["E"] ? "I" : "E";
  result += mbti["S"] > mbti["N"] ? "S" : "N";
  result += mbti["T"] > mbti["F"] ? "T" : "F";
  result += mbti["J"] > mbti["P"] ? "J" : "P";

  return result as Personality;
};

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="29"
    height="27"
    viewBox="0 0 29 27"
    fill="none"
  >
    <path
      d="M25.4522 2.75804C25.1838 2.97176 24.824 3.42262 23.6428 4.66695C21.2002 7.24008 18.9679 8.86079 18.373 9.50048C17.2197 10.7406 15.8335 12.0737 14.1509 13.8583C13.3129 14.7472 12.6701 15.479 9.98712 18.5549C7.76453 20.7131 6.3379 22.4035 5.83691 23.0232C5.61783 23.3089 5.47013 23.536 5.11461 23.932"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M3.08398 2.96973C3.14226 3.05571 3.20054 3.14169 4.00904 3.93765C4.81754 4.73361 6.3745 6.23693 8.36467 7.94276C10.3548 9.64859 12.731 11.5114 14.0494 12.5639C15.3677 13.6164 15.5562 13.8022 15.8632 14.0691C16.579 14.6915 17.3996 15.403 18.0098 15.996C18.3108 16.2884 18.9796 16.9885 19.8843 18.0156C20.4165 18.6198 20.6765 18.8751 20.9612 19.2392C21.4188 19.8245 21.7872 20.1234 22.0147 20.4016C22.3202 20.7754 22.7527 21.1551 23.0992 21.4523C23.3846 21.6972 23.6396 21.9602 24.3278 22.5296C25.0759 23.1664 25.3852 23.3609 25.6761 23.5948C25.7539 23.6441 25.8289 23.681 25.9062 23.719"
      stroke="black"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const Modal = ({
  modalOpenUrl,
  closeModal,
}: {
  modalOpenUrl: string;
  closeModal: () => void;
}) => {
  return (
    <div className="modal-inner">
      <div className="close-icon" onClick={closeModal}>
        <CloseIcon />
      </div>
      <p style={{ width: "calc(100% - 40px - 3rem)" }}>
        If you're on desktop, download your results{" "}
        <strong
          className="fake-link"
          onClick={() => download(modalOpenUrl, "transit.png")}
        >
          by clicking here
        </strong>
        .
      </p>
      <p>
        If you're on mobile, hold down on your results image until you have an
        option to save it to your camera roll.
      </p>
      <img src={modalOpenUrl} />
    </div>
  );
};

function getImgUrl(name: string) {
  // we slap the photos in the public folder
  return `/results/${name}`;
}

function getImagesForPersonalityId(personalityId: FinalResultId): {
  ticketURL: string;
  titleURL: string;
  contentURL: string;
} {
  return {
    ticketURL: getImgUrl(`${personalityId}/ticket.png`),
    titleURL: getImgUrl(`${personalityId}/title.png`),
    contentURL: getImgUrl(`${personalityId}/content.png`),
  };
}

const LoadingResult: React.FC = () => {
  const valueWithInterval = useAnimatedValue(2, 600);
  const scale = valueWithInterval === 0 ? "0.8" : "0.9";

  return (
    <div
      className="loading-outer"
      style={{
        transform: `scale(${scale}) rotate(-5deg)`,
        opacity: 0.8,
        transition: "transform 0.5s ease-out, opacity 0.2s linear",
      }}
    >
      {
        <div className="loading-in-out">
          <img src={loadingTag} className="loading-tag" />
          <img src={spinner} className="spinner" />
        </div>
      }
    </div>
  );
};

const Results: React.FC = () => {
  const { mbtis } = useAtomValue(currentStateAtom);
  const setCurrentState = useSetAtom(currentStateAtom);
  const mbtiScores = arrayToScore(mbtis);
  const mbtiString = actualMBTI(mbtiScores);
  const finalResultId = personalityToFinalResultId[mbtiString];

  const { ticketURL, titleURL, contentURL } =
    getImagesForPersonalityId(finalResultId);

  const isLoadingImages = usePreloadSomeImages([
    ticketURL,
    titleURL,
    contentURL,
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [modalOpenUrl, setModalOpenUrl] = useState<string>("");

  useEffect(() => {
    if (modalOpenUrl) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
  }, [modalOpenUrl]);

  const clear = useCallback(() => {
    setCurrentState({
      currentQuestion: 0,
      mbtis: [],
    });
  }, [setCurrentState]);

  const save = useCallback(async () => {
    setIsSaving(true);
    const node = document.getElementById("results-save");
    if (node) {
      await htmlToImage.toPng(node);
      await htmlToImage.toPng(node);
      await htmlToImage.toPng(node);
      const dataUrl = await htmlToImage.toPng(node);
      setModalOpenUrl(dataUrl);
    }
    setIsSaving(false);
  }, [setModalOpenUrl]);

  return (
    <>
      <AnimatePresence>
        {isLoadingImages && (
          <motion.div exit={{ opacity: 0 }} className="loading-results-outer">
            <LoadingResult />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="results-outer">
        <AnimatePresence>
          {modalOpenUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="modal-outer"
            >
              <Modal
                modalOpenUrl={modalOpenUrl}
                closeModal={() => {
                  setModalOpenUrl("");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div id="results-save">
          <div className="results-header">
            <img src={titleURL} className="results-title" />
            <div className="ticket-animation">
              <div className="ticket-wobble-animation">
                <div className="ticket-outer">
                  <img src={ticketURL} />
                  <p>asdf</p>
                </div>
              </div>
            </div>
          </div>
          {!isSaving && (
            <>
              <div className="results-buttons">
                <img src={saveButton} onClick={save} />
                <img src={againButton} onClick={clear} />
              </div>
            </>
          )}
          <img src={contentURL} className="results-content" />
        </div>
        <div style={{ width: "80vw" }}>
          <h2>debug</h2>
          <p>{mbtiString}</p>
          <p style={{ wordBreak: "break-all" }}>{JSON.stringify(mbtiScores)}</p>
        </div>
      </div>
    </>
  );
};

export default Results;
