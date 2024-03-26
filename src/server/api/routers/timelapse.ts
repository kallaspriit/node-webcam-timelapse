import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const timelapseRouter = createTRPCRouter({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),

  getCaptureFolders: publicProcedure.query(async () => {
    console.log("getCaptureFolders");

    return ["folder1", "folder2"];
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
