import { type WebcamOptions } from "node-webcam";
import { type CaptureIntervalOptions } from "./util/setCaptureInterval";
import { join } from "path";
import { getFlashDrivePath } from "./util/getFlashDrivePath";
import { ensurePathExists } from "@/util/ensurePathExists";

export interface Config {
  webcam: WebcamOptions;
  capture: CaptureIntervalOptions;
  projectPath: string;
  publicPath: string;
  flashDrivePath: string | null;
  captureBasePath: string;
  outputPath: string;
  lastFrameFilename: string;
}

const projectPath = join(__dirname, "..", "..");
const publicPath = join(projectPath, "public");
const flashDrivePath = getFlashDrivePath();
const captureBasePath = flashDrivePath ?? publicPath;
const outputPath = join(captureBasePath, "timelapse");
const lastFrameFilename = join(publicPath, "last.jpg");

ensurePathExists(captureBasePath);
ensurePathExists(outputPath);

export const config: Config = {
  // options used to capture the webcam
  webcam: {
    width: 1920,
    height: 1080,
    quality: 90,
    output: "jpeg",
    // TODO: automatically choose largest available videoN device
    device: "/dev/video2",
    // callbackReturn: "location",
    // frames: 60,
    // delay: 0,
    // saveShots: true,
    // verbose: false,
  },

  // options used to calculate appopriate capture interval
  capture: {
    startHours: 7, // start capturing at this hour
    endHours: 21, // stop capturing at this hour
    outputDurationSeconds: 60, // maps to this many seconds
    fps: 60, // given this many frames per second
  },

  // paths configuration
  projectPath,
  publicPath,
  flashDrivePath,
  captureBasePath,
  outputPath,
  lastFrameFilename,
};

console.log("config", config);
