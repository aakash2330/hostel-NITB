
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateBookingValidator } from "~/utils/validators/bookingValidators";
import { CreateGuestValidator } from "~/utils/validators/guestValidators";


export const bookingRouter = createTRPCRouter({

  createBooking: protectedProcedure
    .input(CreateBookingValidator)
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session)
      const bookingDetails = await ctx.db.bookingDetails.create({
        data: { ...input, guestProfileId: ctx.session.user.id, bookingPersonProfileId: ctx.session.user.id, bookingPersonName: ctx.session.user.name!, bookingPersonEmail: ctx.session.user.email!, bookingPersonMobileNo: "0000000000" }
      })
      return { bookingDetails }
    }),

  getAllBookings: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const bookings = await ctx.db.bookingDetails.findMany({})
      return { bookings }
    }),
  getBookingByID: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const booking = await ctx.db.bookingDetails.findFirst({
        where: {
          id
        }
      })
      return { booking }
    }),

});
