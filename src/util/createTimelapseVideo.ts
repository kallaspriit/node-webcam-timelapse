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
  console.log("Creating timelapse video", {
    imagesLength: images.length,
    filename,
    config,
  });

  const command = FfmpegCommand()
    .fps(60)
    .outputFormat("mp4")
    .size("1920x1080")
    .videoCodec("libx264")
    .inputFormat("image2")
    .addOptions(["-pix_fmt yuv420p"]);

  images.forEach((image) => {
    command.addInput(image);
  });

  return new Promise<TimelapseResult>((resolve, reject) => {
    command
      .on("start", (commandLine) => {
        console.log(
          "Spawned Ffmpeg with command: " +
            commandLine.substring(0, 100) +
            "..." +
            commandLine.substring(commandLine.length - 100),
        );
      })
      .on("progress", (progress) => {
        console.log("Processing: " + progress.percent + "% done");
      })
      .on("end", () => {
        console.log("Finished processing");

        resolve({ filename });
      })
      // .on("stderr", (stderrLine) => {
      //   console.log("Stderr output: " + stderrLine);
      // })
      .on("error", (error) => {
        console.error("Error processing video", error);

        reject(error);
      })
      .output(filename)
      .run();
  });
}
