
import { BookingStatus } from "@prisma/client";
import { TRPCError } from "@trpc/server";
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
      const { hostelName, nosRooms, guestIds, remark, bookedToDt, bookingDate, bookedFromDt } = input;
      const bookingDetails = await ctx.db.bookingDetails.create({
        data: { hostelName, remark, bookedToDt, bookingDate, bookedFromDt, bookingStatus: BookingStatus.BOOKED, bookPaymentId: "", userId: ctx.session.user.id }
      })
      const guests = await ctx.db.guestProfile.updateMany({
        where: {
          id: { in: guestIds }
        },
        data: {
          bookingDetailsId: bookingDetails.id
        }
      })

      const rooms = await ctx.db.roomDetails.findMany({ where: { hostelName }, take: nosRooms })

      if (rooms.length == nosRooms) {
        const updatedRooms = await ctx.db.roomDetails.updateMany({
          where:
          {
            id: { in: rooms.map((r) => r.id) }
          },
          data: {
            bookingDetailsId: bookingDetails.id
          }
        })
      }
      else {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
      return { bookingDetails }
    }),

  getAllBookings: protectedProcedure
    .input(z.object({ userId: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      if (input.userId == '') {
        const bookings = await ctx.db.bookingDetails.findMany({ where: { userId: ctx.session.user.id } })
        console.log({ bookings })
        return { bookings }
      }
      else {
        const bookings = await ctx.db.bookingDetails.findMany({})
        return { bookings }
      }
    }),
  getBookingByID: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const booking = await ctx.db.bookingDetails.findFirst({
        where: {
          id
        },
        include: {
          guests: true,
          rooms: {
            select: {
              code: true
            }
          }
        }
      })
      return { booking }
    }),

});
