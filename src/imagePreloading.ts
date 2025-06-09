import { useEffect, useState } from "react";
import fullBus from "./assets/img/full-bus.png";
import loadingTag from "./assets/img/loading.png";
import tagHere from "./assets/img/taghere.png";
import spinner from "./assets/img/spinner.png";
import startButton from "./assets/img/start-button.png";
import introText from "./assets/img/intro-text.png";
import skyline from "./assets/img/skyline.png";
import waymo from "./assets/img/waymo-front.svg";
import iphone from "./assets/img/iphone.png";
import thunderstorm from "./assets/img/thunderstorm.png";
import waymoInsideBase from "./assets/img/question4/waymo-inside-base.png";
import waymoInsideScreen from "./assets/img/question4/waymo happy frame.svg";
import lightning1 from "./assets/img/question4/lightning-1.svg";
import lightning2 from "./assets/img/question4/lightning-2.svg";
import windowBase from "./assets/img/question4/window-base.svg";
import windowFlash from "./assets/img/question4/window-flash.svg";
import bye from "./assets/img/bye.png";
import muniShelter from "./assets/img/muni-shelter.svg";
import busPuddle from "./assets/img/question7/bus-puddle.svg";
import subtract from "./assets/img/question7/subtract.svg";
import tapIn from "./assets/img/taghere.png";
import clipper from "./assets/img/clipper.png";
import no from "./assets/img/no.png";
import passengers from "./assets/img/passengers.svg";
import manEyes from "./assets/img/man-eyes.svg";
import womanEyes from "./assets/img/woman-eyes.svg";
import busWindow from "./assets/img/question11/window.png";
import houses from "./assets/img/question11/houses.png";
import stars from "./assets/img/question11/stars.png";
import oldManEyes from "./assets/old-man.png";
import oldManEyesClosed from "./assets/old-man-blink.png";
import questions from "./assets/questions.png";
import meme from "./assets/meme.png";
import p2p from "./assets/p2p.png";
import endDark from "./assets/img/end-dark.png";
import endLight from "./assets/img/end-light.png";

const ALL_IMAGES = [
  fullBus,
  loadingTag,
  tagHere,
  spinner,
  startButton,
  introText,
  skyline,
  waymo,
  iphone,
  thunderstorm,
  waymoInsideBase,
  waymoInsideScreen,
  lightning1,
  lightning2,
  windowBase,
  windowFlash,
  bye,
  muniShelter,
  busPuddle,
  subtract,
  tapIn,
  clipper,
  no,
  passengers,
  manEyes,
  womanEyes,
  busWindow,
  houses,
  stars,
  oldManEyes,
  oldManEyesClosed,
  questions,
  meme,
  p2p,
  endDark,
  endLight,
];

export const usePreloadAllImages = () => {
  const [isLoading, setIsLoading] = useState(true);

  const cacheImages = async (srcArray: string[]): Promise<void> => {
    const promises = srcArray.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log("loaded", src);
          resolve();
        };
        img.onerror = () => reject();
      });
    });
    await Promise.all(promises);
    setIsLoading(false);
  };

  useEffect(() => {
    cacheImages(ALL_IMAGES);
  }, []);

  return isLoading;
};

export const usePreloadSomeImages = (images: string[]) => {
  const [isLoading, setIsLoading] = useState(true);

  const cacheImages = async (srcArray: string[]): Promise<void> => {
    const promises = srcArray.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log("loaded", src);
          resolve();
        };
        img.onerror = () => reject();
      });
    });
    await Promise.all(promises);
    setIsLoading(false);
  };

  useEffect(() => {
    cacheImages(images);
  }, [images]);

  return isLoading;
};
