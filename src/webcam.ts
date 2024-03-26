import { type WebcamOptions, create } from "node-webcam";
import { join } from "path";
import { getFlashDrivePath } from "@/util/getFlashDrivePath";
import { formatDuration } from "@/util/formatDuration";
import { CaptureFrameOptions, captureFrame } from "@/util/captureFrame";
import {
  CaptureIntervalOptions,
  setCaptureInterval,
} from "@/util/setCaptureInterval";
import { config } from "@/config";

export function startWebcamCapture() {
  // create webcam
  const webcam = create({
    ...config.webcam,
    platform: "fswebcam",
  });

  // captures a frame and stores it in the capture directory and last frame
  const captureNextFrame = (
    extraOptions: Partial<CaptureFrameOptions> = {},
  ) => {
    captureFrame({
      webcam,
      flashDrivePath: config.flashDrivePath,
      localCapturePath: config.localCapturePath,
      lastFramePath: config.lastFramePath,
      ...extraOptions,
    });
  };

  // get the capture options
  const { capture } = config;

  // capture an image at interval
  const { captureInterval } = setCaptureInterval(captureNextFrame, capture);

  // log the capture settings
  console.log("\n-- Starting webcam capture --");
  console.log(
    `- starting capture: ${capture.startHours.toString().padStart(2, "0")}:00`,
  );
  console.log(
    `- stopping capture: ${capture.endHours.toString().padStart(2, "0")}:00`,
  );
  console.log(
    `- output duration: ${formatDuration(capture.outputDurationSeconds)}`,
  );
  console.log(`- capture interval: ${formatDuration(captureInterval / 1000)}`);
  console.log(
    `- images per sequence: ${Math.round(capture.outputDurationSeconds * capture.fps)}`,
  );
  console.log(`- last frame is stored in '${config.lastFramePath}'\n`);

  // TODO: ideally only do this if the web ui is open
  // update the last frame more often to provide a live view
  setInterval(() => captureNextFrame({ updateLastFrameOnly: true }), 1000);

  // capture the first frame immediately
  captureNextFrame();
}
