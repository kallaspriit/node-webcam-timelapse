import { z } from "zod";
import { config } from "@/config";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { glob } from "glob";
import { delay } from "@/util/delay";
import { createTimelapseVideo } from "@/util/createTimelapseVideo";
import { join } from "path";

export const timelapseRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  /**
   * Returns a list of folders containing captures.
   *
   * Returns the absolute `path` and `date` of capture.
   */
  getCaptureFolders: publicProcedure.query(async () => {
    const { captureBasePath } = config;
    const daysPaths = glob.sync(`${captureBasePath}/*`);

    // simulate network latency
    // await delay(5000);

    return daysPaths
      .map((dayPath) => {
        return {
          path: dayPath,
          date: new Date(dayPath.split("/").pop() as string),
        };
      })
      .filter((day) => !isNaN(day.date.getTime()))
      .sort((a, b) => (a.date.getTime() > b.date.getTime() ? -1 : 1));
  }),

  createDayTimelapse: publicProcedure
    .input(z.object({ path: z.string().min(1) }))
    .mutation(async ({ input: { path } }) => {
      const { outputPath } = config;
      const images = glob.sync(`${path}/*.jpg`);
      const filename = join(outputPath, "timelapse.mp4");

      console.log("createDayTimelapse", {
        path,
        imageCount: images.length,
        filename,
      });

      return createTimelapseVideo({
        images,
        filename,
      });
    }),

  // getLatest: publicProcedure.query(() => {
  //   return post;
  // }),
});
