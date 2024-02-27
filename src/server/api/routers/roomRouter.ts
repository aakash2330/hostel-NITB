import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const roomRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),


  getAllRooms: publicProcedure
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session)
      const roomDetails = await ctx.db.roomDetails.findMany({})
      return { roomDetails }
    }),

  getRoomById: publicProcedure
    .input(z.object({ hostelId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { hostelId } = input;
      console.log(ctx.session)
      const roomDetails = await ctx.db.roomDetails.findFirst({
        where: {
          id: hostelId
        }
      })
      return { roomDetails }
    }),


  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
