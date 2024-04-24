import { config } from "@/config";
import FfmpegCommand from "fluent-ffmpeg";
import { join } from "path";

export interface CreateTimelapseVideoOptions {
  sourcePath: string;
  filename: string;
}

export interface TimelapseResult {
  filename: string;
}

export function createTimelapseVideo({
  sourcePath,
  filename,
}: CreateTimelapseVideoOptions) {
  console.log("Creating timelapse video", {
    sourcePath,
    filename,
    config,
  });

  const command = FfmpegCommand()
    .fps(60)
    .addOptions(["-framerate 60", "-crf 18", "-pattern_type glob"])
    .input(`${sourcePath}/*.jpg`)
    .size("1920x1080")
    // .inputFormat("image2")
    .outputFormat("mp4")
    .videoCodec("libx264")
    .addOptions(["-pix_fmt yuv420p"]);

  // images.forEach((image) => {
  //   command.addInput(image);
  // });

  return new Promise<TimelapseResult>((resolve, reject) => {
    command
      .on("start", (commandLine) => {
        // console.log(
        //   "Spawned Ffmpeg with command: " +
        //     commandLine.substring(0, 100) +
        //     "..." +
        //     commandLine.substring(commandLine.length - 150),
        // );
        console.log("Spawned Ffmpeg with command:\n" + commandLine + "\n");
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
        console.error("Error processing video", JSON.stringify(error, null, 2));

        reject(error);
      })
      .output(filename)
      .run();
    // .save(filename);
  });
}
