import { config } from "@/config";
import FfmpegCommand from "fluent-ffmpeg";
import { join } from "path";

export interface CreateTimelapseVideoOptions {
  images: string[];
  filename: string;
}

export interface TimelapseResult {
  filename: string;
}

export function createTimelapseVideo({
  images,
  filename,
}: CreateTimelapseVideoOptions) {
  const { publicPath } = config;

  const outputFilename = join(publicPath, filename);

  console.log("Creating timelapse video", { images, filename, outputFilename });

  const command = FfmpegCommand()
    .fps(60)
    .outputFormat("mp4")
    .size("1920x1080")
    .videoCodec("libx264");

  images.forEach((image) => {
    command.addInput(image);
  });

  return new Promise<TimelapseResult>((resolve, reject) => {
    command
      .on("start", (commandLine) => {
        console.log("Spawned Ffmpeg with command: " + commandLine);
      })
      .on("progress", (progress) => {
        console.log("Processing: " + progress.percent + "% done");
      })
      .on("end", () => {
        console.log("Finished processing");

        resolve({ filename });
      })
      .on("stderr", (stderrLine) => {
        console.log("Stderr output: " + stderrLine);
      })
      .on("error", (error) => {
        console.error("Error processing video", error);

        reject(error);
      })
      .save(outputFilename);
  });
}
