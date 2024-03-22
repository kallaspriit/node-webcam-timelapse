/* eslint-disable @next/next/no-img-element */
"use client";

import useInterval from "@/hooks/useInterval";
import { useState, type FC } from "react";
import cx from "classnames";

/**
 * Periodically shows the latest captured frame from the webcam.
 *
 * Uses two images on top of each other that are swapped every second to avoid flickering.
 */
export const LatestFrame: FC = () => {
  const [bottomKey, setBottomKey] = useState(0);
  const [topKey, setTopKey] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // make the image update at interval
  useInterval(() => {
    // flip between using the bottom and top image
    setImageIndex(imageIndex === 0 ? 1 : 0);

    // update the bottom/top key alternatively
    if (imageIndex === 0) {
      setBottomKey(bottomKey + 1);
    } else {
      setTopKey(topKey + 1);
    }
  }, 1000);

  return (
    <div className="relative aspect-[1920/1080] flex-1 bg-black">
      {/* Bottom image */}
      <img
        key={`bottom-${bottomKey}`}
        className={cx("absolute inset-0", {
          "z-0": imageIndex === 1,
          "z-10": imageIndex === 0,
        })}
        title={`Bottom capture #${bottomKey}`}
        src={`/last.jpg?bottom-${bottomKey}`}
        alt="Latest captured frame"
      />

      {/* Top image */}
      <img
        key={`top-${topKey}`}
        className={cx("absolute inset-0", {
          "z-0": imageIndex === 0,
          "z-10": imageIndex === 1,
        })}
        title={`Top capture #${topKey}`}
        src={`/last.jpg?top-${topKey}`}
        alt="Latest captured frame"
      />

      {/* Show current time */}
      <div className="absolute inset-0 z-20 px-5 py-3">
        <div suppressHydrationWarning className="font-mono">
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
