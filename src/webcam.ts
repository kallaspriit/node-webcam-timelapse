import { type WebcamOptions, create } from "node-webcam";
import { join } from "path";
import { getFlashDrivePath } from "./util/getFlashDrivePath";
import { formatDuration } from "./util/formatDuration";
import { CaptureFrameOptions, captureFrame } from "./util/captureFrame";
import {
  CaptureIntervalOptions,
  setCaptureInterval,
} from "./util/setCaptureInterval";

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
    startHours: 7, // start capturing at this hour
    endHours: 20, // stop capturing at this hour
    outputDurationSeconds: 60, // maps to this many seconds
    fps: 60, // given this many frames per second
  };
  // const availableCameras = list();

  // create webcam
  const webcam = create({
    ...webcamOptions,
    platform: "fswebcam",
  });

  const flashDrivePath = getFlashDrivePath();

  // prefer flash drive but fallback to local directory
  const projectPath = join(__dirname, "..", "..");
  const localCapturePath = join(projectPath, "public");
  const lastFramePath = join(localCapturePath, "last.jpg");

  // captures a frame and stores it in the capture directory and last frame
  const captureNextFrame = (
    extraOptions: Partial<CaptureFrameOptions> = {},
  ) => {
    captureFrame({
      webcam,
      flashDrivePath,
      localCapturePath,
      lastFramePath,
      ...extraOptions,
    });
  };

  // capture an image at interval
  const { captureInterval } = setCaptureInterval(
    captureNextFrame,
    captureOptions,
  );

  // log the capture settings
  console.log("\n-- Starting webcam capture --");
  console.log(
    `- starting capture: ${captureOptions.startHours.toString().padStart(2, "0")}:00`,
  );
  console.log(
    `- stopping capture: ${captureOptions.endHours.toString().padStart(2, "0")}:00`,
  );
  console.log(
    `- output duration: ${formatDuration(captureOptions.outputDurationSeconds)}`,
  );
  console.log(`- capture interval: ${formatDuration(captureInterval / 1000)}`);
  console.log(
    `- images per sequence: ${Math.round(captureOptions.outputDurationSeconds * captureOptions.fps)}`,
  );
  console.log(`- last frame is stored in '${lastFramePath}'\n`);

  // TODO: ideally only do this if the web ui is open
  // update the last frame more often to provide a live view
  setInterval(() => captureNextFrame({ updateLastFrameOnly: true }), 1000);

  // capture the first frame immediately
  captureNextFrame();
}
