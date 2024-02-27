
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateGuestValidator } from "~/utils/validators/guestValidators";


export const guestsRouter = createTRPCRouter({
  createGuest: protectedProcedure
    .input(CreateGuestValidator)
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session)
      const guest = await ctx.db.guestProfile.create({
        data: { ...input, userId: ctx.session.user.id }
      })
      return { guest }
    }),
  getGuestsByUserId: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = input
      const guests = await ctx.db.guestProfile.findMany({
        where: {
          userId: ctx.session.user.id
        }
      })
      return { guests }
    }),

});
