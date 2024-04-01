import { GuestHouse } from "@prisma/client";
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
      const roomCharges = await ctx.db.roomCharges.findMany({})
      return { roomDetails, roomCharges }
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
      const roomCharges = await ctx.db.roomCharges.findFirst({ where: { hostelName: roomDetails?.hostelName } })
      return { roomDetails, roomCharges }
    }),

  getRoomsByGuestHouse: publicProcedure
    .input(z.object({ guestHouse: z.custom<GuestHouse>() }))
    .query(async ({ ctx, input }) => {
      console.log(ctx.session)
      const roomDetails = await ctx.db.roomDetails.findMany({
        where: {
          hostelName: input.guestHouse
        }
      })
      return { roomDetails }
    }),


  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
