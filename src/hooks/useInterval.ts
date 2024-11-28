import React, { useEffect, useRef } from 'react';
import { IS_END_TO_END, IS_LOCAL_TESTING } from '../constants/environment';

export const useInterval = (
  callback: Function,
  delay: number | null | undefined,
  environment: string,
) => {
  const savedCallback = useRef<Function>(() => {});

  const isLocalOrE2E = (): boolean => {
    return environment === IS_END_TO_END || environment === IS_LOCAL_TESTING;
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      console.log(isLocalOrE2E());
      const actualDelay = isLocalOrE2E() ? 100 : delay;
      const id = setInterval(tick, actualDelay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
