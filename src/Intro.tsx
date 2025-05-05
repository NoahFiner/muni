import React, { useCallback, useEffect, useState } from "react";

import "./Intro.css";
import { useSetAtom } from "jotai";
import fullBus from "./assets/img/full-bus.png";
import loadingTag from "./assets/img/loading.png";
import tagHere from "./assets/img/taghere.png";
import spinner from "./assets/img/spinner.png";
import startButton from "./assets/img/start-button.png";
import introText from "./assets/img/intro-text.png";

import houses from "./assets/img/question11/houses.png";
import { currentStateAtom } from "./atoms";
import { AnimatePresence, motion } from "motion/react";
import { useAnimatedValue } from "./hooks";
import { usePreloadAllImages } from "./imagePreloading";

const Intro: React.FC = () => {
  const setCurrentState = useSetAtom(currentStateAtom);
  const start = useCallback(() => {
    setCurrentState({
      currentQuestion: 1,
      mbtis: [],
    });
  }, [setCurrentState]);

  const [introState, setIntroState] = useState<'loading' | 'ready' | 'intro'>('loading');

  const isPreloading = usePreloadAllImages()

  useEffect(() => {
    if(!isPreloading && introState === 'loading') {
      setIntroState("ready");
    }
  }, [introState, isPreloading])

  const valueWithInterval = useAnimatedValue(2, 600);

  const scale = introState === 'loading' ? valueWithInterval === 0 ? "0.8" : "0.9" : valueWithInterval === 0 ? "1.2" : "1.1";
  const opacity = introState === 'loading' ? "0.8" : "1";

  return (
    <div className="intro-outer">
      { introState === 'intro' ? (
          <AnimatePresence>
          <motion.img
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.2,
              type: "spring",
              bounce: 0.1,
            }}
            className="intro-text"
            src={introText} />
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: "spring",
              bounce: 0.1,
            }}
            className="start-button"
            onClick={start}
          >
            <img src={startButton} />
          </motion.button>
          <img className="driving-background intro-houses" src={houses} />
            <div className="vroom">
              <img className="vroom-inner full-bus intro-bus" src={fullBus} />
            </div>
          </AnimatePresence>
        ) : (
          <div className="loading-outer" style={{ transform: `scale(${scale}) rotate(-5deg)`, opacity, transition: "transform 0.5s ease-out, opacity 0.2s linear" }}>
            {
              introState === 'loading' && (
                <div className="loading-in-out">
                  <img src={loadingTag} className="loading-tag" />
                  <img src={spinner} className="spinner" />
                </div>
              )
            }
            {
              introState === 'ready' && (
                <img src={tagHere} className="loaded-tag" onClick={() => setIntroState("intro")}/>)
            }
          </div>
        )
      }
      
    </div>
  );
};

export default Intro;
