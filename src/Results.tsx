import { useAtomValue, useSetAtom } from "jotai";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  currentStateAtom,
  MBTIScore,
  hasSubmittedStatsAtom,
  quizStartTimeAtom,
  timesTakenAtom,
  userIdAtom,
} from "./atoms";
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
import { supabase, QuizResponseInsert } from "./lib/supabase";
import { trackQuizComplete } from "./analytics";

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
  "1": 0,
  "2": 0,
};

const FALLBACK_MBTI: { [key in Personality]: string } = {
  INTJ: "02.10%",
  INTP: "03.30%",
  ENTJ: "01.80%",
  ENTP: "03.20%",
  INFJ: "01.50%",
  INFP: "04.40%",
  ENFJ: "02.50%",
  ENFP: "08.10%",
  ISTJ: "11.60%",
  ISFJ: "13.80%",
  ESTJ: "08.70%",
  ESFJ: "12.30%",
  ISTP: "05.40%",
  ISFP: "08.80%",
  ESTP: "04.30%",
  ESFP: "08.50%",
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

function isMobileSafari() {
  const userAgent = navigator.userAgent;
  return /iPad|iPhone|iPod/.test(userAgent) && /AppleWebKit/.test(userAgent);
}

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
        Downloaded your results!!! If that didn't work, try holding down on the
        below image, then tapping "Save to camera roll".
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
  const hasSubmittedStats = useAtomValue(hasSubmittedStatsAtom);
  const setHasSubmittedStats = useSetAtom(hasSubmittedStatsAtom);
  const quizStartTime = useAtomValue(quizStartTimeAtom);
  const timesTaken = useAtomValue(timesTakenAtom);
  const userId = useAtomValue(userIdAtom);
  const mbtiScores = arrayToScore(mbtis);
  const mbtiString = actualMBTI(mbtiScores);
  const finalResultId = personalityToFinalResultId[mbtiString];

  const { ticketURL, titleURL, contentURL } =
    getImagesForPersonalityId(finalResultId);

  const [isSaving, setIsSaving] = useState(false);
  const [modalOpenUrl, setModalOpenUrl] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const hasSubmitted = useRef(false);

  const isLoadingImages = usePreloadSomeImages([
    ticketURL,
    titleURL,
    contentURL,
  ]);

  const isLoadingPercentage = !percentage;

  const isLoading = isLoadingPercentage || isLoadingImages;

  useEffect(() => {
    if (modalOpenUrl) {
      document.body.classList.add("stop-scroll");
    } else {
      document.body.classList.remove("stop-scroll");
    }
  }, [modalOpenUrl]);

  const fetchFinalResult = useCallback(async () => {
    try {
      // Calculate percentage using efficient backend function
      const { data: percentageValue, error: percentageError } =
        await supabase.rpc("get_personality_percentage_optimistic", {
          p_personality_result: mbtiString,
        });

      if (percentageError) throw percentageError;

      // Format as exactly 4 digits (XX.XX%)
      const formattedPercentage =
        (percentageValue || 0).toFixed(2).padStart(5, "0") + "%";
      setPercentage(formattedPercentage);
    } catch {
      setPercentage(FALLBACK_MBTI[mbtiString]);
    }
  }, [mbtiString]);

  // Do an optimistic percentage calculation
  useEffect(() => {
    if (!percentage) {
      fetchFinalResult();
    }
  }, [fetchFinalResult, percentage]);

  useEffect(() => {
    if (!isLoading) {
      trackQuizComplete(mbtiString);
    }
  }, [isLoading, mbtiString]);

  // Handle full response submission and percentage calculation
  useEffect(() => {
    const submitResponsesAndCalculatePercentage = async () => {
      if (
        hasSubmittedStats ||
        hasSubmitted.current ||
        !mbtiString ||
        !quizStartTime ||
        !userId ||
        mbtis.length !== 17 ||
        isLoading
      )
        return;

      // Mark that we're submitting to prevent double submissions
      hasSubmitted.current = true;

      try {
        // Transform mbtis array to question-response format
        const responses = mbtis.map((response, index) => ({
          question: index + 1,
          response: response,
        }));

        // Calculate completion time in seconds with millisecond precision
        const completionTimeSeconds = (Date.now() - quizStartTime) / 1000;

        // Prepare the quiz response data
        const quizResponseData: QuizResponseInsert = {
          user_id: userId,
          personality_result: mbtiString,
          responses: responses,
          completion_time_seconds: completionTimeSeconds,
          times_submitted: timesTaken,
        };

        // Submit the complete quiz response
        const { error: insertError } = await supabase
          .from("quiz_responses")
          .insert(quizResponseData);

        if (insertError) {
          // Check if it's a duplicate submission error
          if (insertError.code === "23505") {
            // Unique constraint violation - this user already submitted this attempt
            console.log(
              "Quiz already submitted (duplicate detected by database)",
            );
          } else {
            throw insertError;
          }
        }

        // Mark as fully submitted
        setHasSubmittedStats(true);
      } catch (error) {
        console.error("Error submitting quiz response:", error);
        // Reset submission status on error so it can be retried
        hasSubmitted.current = false;
      }
    };

    submitResponsesAndCalculatePercentage();
  }, [
    mbtiString,
    hasSubmittedStats,
    quizStartTime,
    userId,
    mbtis,
    timesTaken,
    setHasSubmittedStats,
    isLoading,
  ]);

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
      download(dataUrl, "transit.png");
      if (isMobileSafari()) {
        setModalOpenUrl(dataUrl);
      }
    }
    setIsSaving(false);
  }, [setModalOpenUrl]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
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
        <div
          id="results-save"
          className={modalOpenUrl ? "no-pointer-events" : ""}
        >
          <div className="results-header">
            <img src={titleURL} className="results-title" />
            <div className="ticket-animation">
              <div className="ticket-wobble-animation">
                <div className="ticket-outer">
                  <img src={ticketURL} />
                </div>
                {percentage && <p id="percentage-results">{percentage}</p>}
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
          {isSaving && (
            <p className="watermark">
              <p>
                get ur own transit astrology <strong>www.sftransit.fun</strong>
              </p>
            </p>
          )}
        </div>
        {/* <p className="watermark watermark-small">
          questions or feedback? shoot an email to sftransitquizdude@gmail.com.
        </p>
        <p className="watermark watermark-small">
          transit is a cultural staple of san francisco and essential for it to
          flourish. without public transit, sf would be cooked.
        </p> */}
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
