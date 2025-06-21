import { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { timesTakenAtom } from "./atoms";

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

export const useTimesTaken = (
  shouldIncrement: boolean,
  shouldReset: boolean,
) => {
  const timesTaken = useAtomValue(timesTakenAtom);
  const setTimesTaken = useSetAtom(timesTakenAtom);
  const [hasStarted, setHasStarted] = useState(false);

  // Reset hasStarted when shouldReset becomes true
  useEffect(() => {
    if (shouldReset) {
      setHasStarted(false);
    }
  }, [shouldReset]);

  useEffect(() => {
    if (shouldIncrement && !hasStarted) {
      const newTimesTaken = timesTaken + 1;
      setTimesTaken(newTimesTaken);
      setHasStarted(true);
    }
  }, [shouldIncrement, hasStarted, timesTaken, setTimesTaken]);

  return timesTaken;
};
