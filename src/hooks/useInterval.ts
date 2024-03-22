import { useEffect, useRef } from "react";

const useInterval = (callback: VoidFunction, interval: number) => {
  const savedCallback = useRef<VoidFunction>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    const intervalId = setInterval(tick, interval);
    return () => clearInterval(intervalId);
  }, [interval]);
};

export default useInterval;
