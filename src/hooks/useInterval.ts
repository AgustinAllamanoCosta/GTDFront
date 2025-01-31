import React, { useEffect, useRef } from 'react';

export const useInterval = (
  callback: Function,
  delay: number | null | undefined,
) => {
  const savedCallback = useRef<Function>(() => {});
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null && delay !== undefined) {
      intervalRef.current = setInterval(tick, delay);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [delay]);
};
