import { z } from "zod";
import { config } from "@/config";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { glob } from "glob";

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

    console.log("getCaptureFolders", { daysPaths });

    return daysPaths
      .map((dayPath) => {
        return {
          path: dayPath,
          date: new Date(dayPath.split("/").pop() as string),
        };
      })
      .sort((a, b) => (a.date.getTime() > b.date.getTime() ? -1 : 1));
  }),

  createDayTimelapse: publicProcedure
    .input(z.object({ folder: z.string().min(1) }))
    .mutation(async ({ input }) => {
      console.log("createDayTimelapse", input);

      return true;
    }),

  // getLatest: publicProcedure.query(() => {
  //   return post;
  // }),
});
