import { useEffect, useState } from "react";

export const FRAME_TIME_MS = 250;

export const useAnimatedValue = (maxValue: number, duration?: number) => {
  const [index, setIndex] = useState(Math.floor(Math.random() * maxValue));

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIndex((prev) => (prev + 1) % maxValue);
    }, duration || FRAME_TIME_MS);

    return () => {
      clearInterval(animationInterval);
    };
  }, [maxValue, duration]);
  return index;
};
