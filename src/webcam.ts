import { type WebcamOptions, create, list } from "node-webcam";
import { copyFile } from "fs/promises";
import { join } from "path";
import { getFlashDrivePath } from "./util/getFlashDrivePath";
import { formatDate } from "./util/formatDate";
import { ensurePathExists } from "./util/ensurePathExists";
import {
  type GetCaptureIntervalOptions,
  getCaptureInterval,
} from "./util/getCaptureInterval";
import { formatDuration } from "./util/formatDuration";
import { formatDatetime } from "./util/formatDatetime";

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
  const captureOptions: GetCaptureIntervalOptions = {
    sequenceDurationSeconds: 24 * 60 * 60, // this amount of time
    outputDurationDurationSeconds: 60, // maps to this many seconds
    fps: 60, // given this many frames per second
  };

  // calculate the capture interval based on the capture options
  const captureInterval = getCaptureInterval(captureOptions);

  // const availableCameras = list();

  // create webcam
  const webcam = create(webcamOptions);

  const flashDrivePath = getFlashDrivePath();

  // prefer flash drive but fallback to local directory
  const projectPath = join(__dirname, "..", "..");
  const publicDirectory = join(projectPath, "public");
  const lastFramePath = join(publicDirectory, "last.jpg");

  // captures a frame and stores it in the capture directory and last frame
  const captureFrame = () => {
    const currentTime = new Date();
    const currentDatePath = formatDate(currentTime);
    const localCaptureDirectory = join(
      projectPath,
      "public",
      "capture",
      currentDatePath,
    );
    const captureDirectory = flashDrivePath
      ? join(flashDrivePath, currentDatePath)
      : localCaptureDirectory;

    // create the capture path if needed (includes current date that changes)
    ensurePathExists(captureDirectory);

    const filename = `${formatDatetime(currentTime, true)}.jpg`;
    const captureFilePath = join(captureDirectory, filename);

    // capture to last frame file
    webcam.capture(lastFramePath, (error, _capturedFilePath) => {
      // handle error
      if (error) {
        console.error("Capturing failed", error, _capturedFilePath);

        return;
      }

      console.log(
        `Captured frame '${captureFilePath}', next in ${formatDuration(captureInterval / 1000)}`,
      );

      // copy the last frame onto capture directory (prefer flash drive)
      copyFile(lastFramePath, captureFilePath).catch((error) => {
        console.error(
          `Copying last to '${captureFilePath}' frame file failed`,
          error,
        );
      });
    });
  };

  // updates just the last frame file, this is called more often to provide live view
  // const updateLastFrame = () => {
  //   const projectPath = join(__dirname, "..", "..");
  //   const publicDirectory = join(projectPath, "public");
  //   const lastFramePath = join(publicDirectory, "last.jpg");

  //   // capture to last frame file
  //   webcam.capture(lastFramePath, (error, _capturedFilePath) => {
  //     // handle error
  //     if (error) {
  //       console.error("Capturing last frame failed", error, _capturedFilePath);

  //       return;
  //     }
  //   });
  // };

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
  setInterval(captureFrame, captureInterval);

  // TODO: ideally only do this if the web ui is open
  // update the last frame more often to provide a live view
  // setInterval(updateLastFrame, 1000);

  // capture the first frame immediately
  captureFrame();
}
