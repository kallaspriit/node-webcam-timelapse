import { type WebcamOptions, create, list } from "node-webcam";
import { copyFile } from "fs/promises";
import { join } from "path";
import { getFlashDrivePath } from "./util/getFlashDrivePath";
import { formatDate } from "./util/formatDate";
import { ensurePathExists } from "./util/ensurePathExists";
import {
  type CaptureIntervalOptions,
  getCaptureInterval,
} from "./util/getCaptureInterval";
import { formatDuration } from "./util/formatDuration";
import { formatDatetime } from "./util/formatDatetime";
import { CaptureFrameOptions, captureFrame } from "./util/captureFrame";

export function startWebcamCapture() {
  // options used to capture the webcam
  const webcamOptions: WebcamOptions = {
    width: 1920,
    height: 1080,
    quality: 90,
    output: "jpeg",
    device: "/dev/video2",
    // callbackReturn: "location",
    // frames: 60,
    // delay: 0,
    // saveShots: true,
    // verbose: false,
  };

  // options used to calculate appopriate capture interval
  const captureOptions: CaptureIntervalOptions = {
    sequenceDurationSeconds: 24 * 60 * 60, // this amount of time
    outputDurationDurationSeconds: 60, // maps to this many seconds
    fps: 60, // given this many frames per second
  };

  // calculate the capture interval based on the capture options
  const captureInterval = getCaptureInterval(captureOptions);

  // const availableCameras = list();

  // create webcam
  const webcam = create({
    ...webcamOptions,
    platform: 'fswebcam'
  });

  const flashDrivePath = getFlashDrivePath();

  // prefer flash drive but fallback to local directory
  const projectPath = join(__dirname, "..", "..");
  const localCapturePath = join(projectPath, "public");
  const lastFramePath = join(localCapturePath, "last.jpg");

  // captures a frame and stores it in the capture directory and last frame
  const captureNextFrame = (extraOptions: Partial<CaptureFrameOptions> = {}) => {
    captureFrame({
      webcam,
      flashDrivePath,
      localCapturePath,
      lastFramePath,
      captureInterval,
      ...extraOptions,
    });
  };

  // log the capture settings
  console.log("\n-- Starting webcam capture --");
  console.log(
    `- sequence duration: ${formatDuration(captureOptions.sequenceDurationSeconds)}`,
  );
  console.log(
    `- output duration: ${formatDuration(captureOptions.outputDurationDurationSeconds)}`,
  );
  console.log(`- capture interval: ${formatDuration(captureInterval / 1000)}`);
  console.log(
    `- images per sequence: ${Math.round(captureOptions.outputDurationDurationSeconds * captureOptions.fps)}`,
  );
  console.log(`- last frame is stored in '${lastFramePath}'\n`);

  // capture an image at interval
  setInterval(captureNextFrame, captureInterval);

  // TODO: ideally only do this if the web ui is open
  // update the last frame more often to provide a live view
  setInterval(() => captureNextFrame({ updateLastFrameOnly: true }), 1000);

  // capture the first frame immediately
  captureNextFrame();
}
