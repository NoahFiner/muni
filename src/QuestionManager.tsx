import { useAtomValue, useSetAtom } from "jotai";
import {
  currentBackgroundColorAtom,
  currentStateAtom,
  currentTextColorAtom,
  hasSubmittedStatsAtom,
  quizStartTimeAtom,
  userIdAtom,
} from "./atoms";
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
import { useCallback, useEffect } from "react";
import Intro from "./Intro";
import { useTimesTaken } from "./hooks";
import { trackQuizStart, trackQuizDropoff } from "./analytics.ts";

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
  const setQuizStartTime = useSetAtom(quizStartTimeAtom);
  const setHasSubmittedStats = useSetAtom(hasSubmittedStatsAtom);
  const userId = useAtomValue(userIdAtom);
  const setUserId = useSetAtom(userIdAtom);
  
  // Use custom hook for times taken logic
  useTimesTaken(currentQuestion === 1, currentQuestion === 0);

  const backgroundColor = useAtomValue(currentBackgroundColorAtom);

  // Set start time and generate user ID when first question is shown
  useEffect(() => {
    if (currentQuestion === 1) {
      setQuizStartTime(Date.now());
      setHasSubmittedStats(false);
      trackQuizStart();

      // Generate user ID if it doesn't exist
      if (!userId && !localStorage.getItem("userId")) {
        const newUserId = crypto.randomUUID();
        setUserId(newUserId);
      }
    }
  }, [
    currentQuestion,
    setHasSubmittedStats,
    setQuizStartTime,
    userId,
    setUserId,
  ]);

  // Track dropoffs when someone leaves the page mid-quiz
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (currentQuestion > 0 && currentQuestion < QUESTIONS_IN_ORDER.length) {
        trackQuizDropoff(currentQuestion);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [currentQuestion, QUESTIONS_IN_ORDER.length]);

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
    [setCurrentState],
  );

  const onClickRestart = useCallback(() => {
    setCurrentState({
      currentQuestion: 0,
      mbtis: [],
    });
    setQuizStartTime(null);
  }, [setCurrentState, setQuizStartTime]);

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
            <>
              <button className="back" onClick={onClickBack}>
                <Back />
              </button>
              <button className="back" onClick={onClickRestart}>
                <Restart />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function Back() {
  const color = useAtomValue(currentTextColorAtom);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
    >
      <path
        d="M16.8856 4.43464C15.7546 4.86008 15.4745 4.71791 14.4114 5.07121C13.3483 5.42451 12.2195 5.70673 11.2996 6.38044C10.4498 6.982 9.75163 7.69589 8.89336 8.43339C7.61914 9.5283 6.38539 9.86254 5.64151 10.9086C4.86065 12.0067 4.01254 13.2766 3.59068 14.6612C2.95517 16.7471 2.72838 18.0241 2.56685 18.9358C2.39073 19.93 1.98675 21.1831 2.00136 23.1256C2.0385 28.0611 2.07427 29.3607 2.3918 30.3942C2.67507 31.3162 3.12427 32.5801 3.48883 33.8985C3.94822 35.56 4.53065 36.6143 4.90309 37.6087C5.22137 38.4585 5.54563 39.5439 6.71096 40.6526C8.19631 42.0658 9.07368 43.0169 9.85565 43.7262C10.5983 44.3999 11.2788 45.3036 12.1547 45.6699C13.0046 46.0253 13.8181 46.7435 14.9504 46.907C16.6925 47.1584 18.8945 47.7671 20.0058 47.969C21.3607 48.2151 23.4001 49.3811 28.0426 48.5674C30.0521 48.2151 31.4694 47.7967 33.4111 46.7977C34.5081 46.2333 35.5914 46.2816 37.9392 44.958C39.3206 44.1792 40.9333 43.6067 41.5423 42.4828C42.0027 41.6329 42.8119 40.8543 43.3459 39.9365C43.8403 39.0866 44.3965 38.3092 44.7952 37.3902C45.2577 36.3239 46.1012 35.099 46.3155 34.1351C46.5988 32.8609 46.7289 31.855 46.9871 30.4207L46.9995 30.3519C47.2434 28.998 47.4758 27.7079 47.1272 25.5403C46.951 24.4454 46.8459 23.1192 46.4184 22.0041C45.8901 20.6259 45.4743 19.3463 44.827 18.2929C44.2604 17.3709 43.6203 16.2058 42.8812 14.9318C41.9942 13.4029 41.0542 11.6786 40.3349 10.8301C39.1593 9.44343 37.3851 7.5335 36.3383 6.83559C35.4884 6.26904 34.6001 5.95864 33.6148 5.52742C32.7299 5.14017 31.9125 4.65485 31.0335 4.25427C30.1836 3.86702 29.1999 3.70694 28.2389 3.44158C27.2129 3.1583 26.2166 2.69996 24.9499 2.84214C23.3808 3.01826 21.2111 2.86888 20.0695 3.26652C19.1497 3.58693 18.3147 3.89705 16.8856 4.43464Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M15.5283 27.7036C16.3028 27.3514 17.8539 27.067 19.9716 27.2431C25.2688 27.6837 28.0943 27.067 30.2353 26.7148C31.641 26.4835 32.6395 26.4304 33.5965 26.2543C34.6804 26.0548 35.8224 26.1461 36.7793 26.3944C37.0276 26.4304 37.3077 26.4304 37.557 26.5005C37.8063 26.5705 38.0164 26.7105 38.2329 26.4304"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M20.6051 18.0156C20.3093 18.4907 19.2354 19.4463 18.486 20.1939C17.577 21.1007 16.7828 22.3148 15.1747 24.4303C13.4914 26.6447 12.9569 27.3347 12.3895 28.1719C11.8097 29.0274 14.1474 29.7872 14.7166 30.3242C15.3981 30.967 16.5964 31.6374 17.5833 32.2362C18.691 32.9083 19.4039 33.9071 20.3926 34.6861C20.6033 34.8663 20.7808 35.0438 20.961 35.1944C21.1411 35.3449 21.3186 35.4633 21.8601 35.7645"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Restart() {
  const color = useAtomValue(currentTextColorAtom);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="51"
      height="52"
      viewBox="0 0 51 52"
      fill="none"
    >
      <path
        d="M11.9362 7.45125C10.8052 8.19392 9.74315 8.40611 9.74528 8.47614L9.74527 8.47614C8.89544 9.04269 8.0488 9.60712 7.37615 10.3148C6.70563 10.8124 5.9765 11.3767 5.32532 12.2967C4.72375 13.1465 4.09706 13.9698 3.80603 14.843C3.52275 15.6928 2.88564 16.933 2.78114 18.3112C2.67398 19.7244 2.48256 20.8476 2.35675 21.8453C2.2496 22.6951 1.71054 27.0198 2.3228 29.4842C2.53393 30.334 2.80024 31.1623 2.92331 32.4209C3.03046 33.5169 3.16848 34.364 3.34769 35.2134C3.52699 36.0632 4.11686 36.7701 4.80014 37.7597C5.43672 38.6817 6.00038 39.964 7.73794 41.4391C8.90394 42.429 9.79633 43.2223 10.6726 44.0204C11.8746 45.1153 12.7696 45.7446 13.7154 46.3895C15.2697 47.4494 16.0151 48.0942 17.1433 48.4733C18.1003 48.7947 19.2533 49.1295 20.149 49.4281C20.9989 49.7114 23.5579 49.9074 25.3499 49.6743C26.7281 49.495 27.848 49.1108 29.0293 49.0377C30.7597 48.9305 31.6341 48.7824 32.4562 48.5422C33.306 48.2939 34.3899 48.2416 35.3918 47.6924C36.4931 47.0887 37.5905 46.2743 38.9641 45.5344C39.884 45.0389 40.6632 44.2716 41.7279 43.1578C44.0556 40.7229 44.6382 39.7464 45.3999 38.601C46.1054 37.5401 46.6841 36.7486 47.0603 35.4532C47.3786 34.3572 47.6124 33.5237 47.6958 32.5886C47.803 31.3865 48.1414 30.2676 48.1202 28.9771C48.083 26.7183 47.881 25.4536 47.7658 24.3852C47.6587 23.3911 47.4417 22.2768 47.3414 21.4145C47.2343 20.4926 46.8857 19.1918 46.2433 17.664C45.6768 16.3166 45.0559 14.721 44.5108 13.7756C43.9793 12.8537 43.3216 11.8259 42.6 11.0171C41.713 10.023 40.8674 8.89734 40.0887 8.04645C39.311 7.19662 38.6168 6.60702 37.5414 6.13778C36.4082 5.64338 35.4084 5.24651 34.5717 4.82962C33.6498 4.37022 32.733 3.76984 31.4918 3.66363C29.8303 3.52146 28.697 2.79841 27.7816 3.02811C26.9318 3.24136 25.6615 3.40001 24.5626 3.55859C23.3203 3.73789 22.0459 3.98872 21.1676 4.23124C20.1416 4.51451 19.2764 4.59074 18.4451 4.86781C17.5953 5.15109 16.6212 5.47136 15.4734 5.89376C14.4124 6.2842 13.2777 6.57033 11.9362 7.45125Z"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M10.4383 21.6604C10.3687 21.6523 10.2992 21.6441 10.3103 21.5397C10.3992 20.7058 11.1646 19.6858 11.6634 18.7805C12.2066 17.7948 13.052 16.9154 13.865 16.0821C14.6689 15.2581 15.9565 14.6184 17.0219 14.0293C18.63 13.1402 19.7694 13.0684 21.0557 12.7188C22.4023 12.3527 24.0443 12.427 25.2906 12.4294C27.0085 12.4328 29.6611 12.3695 31.7436 12.9674C33.1978 13.3849 34.3861 14.1306 35.6731 14.9913C36.7377 15.7032 37.5145 17.1964 38.2905 18.8198C38.7786 19.841 39.1012 20.7315 39.2839 21.6084C39.4667 22.4854 39.4934 23.4819 39.5328 24.6626C39.579 26.0462 39.4881 27.1857 39.2145 28.0094C38.9446 28.8222 38.4929 29.6331 37.9513 30.6028C37.3984 31.5927 36.1924 32.2826 35.1594 32.8776C34.1957 33.4327 33.0935 33.2067 31.9148 33.5316C30.8447 33.8265 29.9482 33.9075 29.0916 33.9153C28.2066 33.9234 27.3614 34.1052 26.4274 34.1735C25.2217 34.2615 23.2488 34.0521 21.8988 33.6114C21.4483 33.4643 21.2966 32.9695 21.101 32.8057C20.2009 32.0516 22.5223 30.9806 23.1856 30.1673C24.0573 29.0982 25.0336 28.3557 25.9703 27.3596C26.7996 26.4777 28.2264 25.3832 28.7341 24.7588C30.4877 22.6023 24.2222 29.8889 23.4504 30.6896C22.199 31.9877 20.284 33.1333 19.2985 33.6238C19.0503 33.7473 18.8331 33.9593 18.8093 34.136C18.6791 35.1005 20.4854 35.5794 21.3745 36.2163C22.5783 37.0786 23.8142 38.173 24.8512 38.7598C25.7499 39.2684 26.4613 39.9092 27.2583 40.7127C27.734 41.1944 28.1879 41.6064 28.5797 41.901C28.7791 42.0322 28.9796 42.1261 29.397 42.2475"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
