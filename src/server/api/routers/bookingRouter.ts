
import { BookingStatus, GuestHouse } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { CreateBookingValidator, emptyBooking } from "~/utils/validators/bookingValidators";
import { CreateGuestValidator } from "~/utils/validators/guestValidators";


export const bookingRouter = createTRPCRouter({

  createBooking: protectedProcedure
    .input(CreateBookingValidator)
    .mutation(async ({ ctx, input }) => {
      const { hostelName, nosRooms, guestIds, remark, bookedToDt, bookingDate, bookedFromDt } = input;
      const bookingDetails = await ctx.db.bookingDetails.create({
        data: { hostelName, remark, bookedToDt, bookingDate, bookedFromDt, bookingStatus: BookingStatus.UNCONFIRMED, bookPaymentId: "", userId: ctx.session.user.id }
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
    .input(z.object({ hostelName: z.custom<GuestHouse>().optional() }))
    .query(async ({ ctx, input }) => {
      console.log(ctx.session.user.role)
      if (ctx.session.user.role != 'ADMIN') {
        const bookings = await ctx.db.bookingDetails.findMany({
          where: { userId: ctx.session.user.id },
          include: {
            guests: {
            },
            rooms: {
            }
          }
        })
        return { bookings }
      }
      else {
        if (input.hostelName) {
          const bookings = await ctx.db.bookingDetails.findMany({
            where: { hostelName: input.hostelName },
            include: {
              guests: {
              },
              rooms: {
              }
            }
          })
          return { bookings }
        }
        else {
          const bookings = await ctx.db.bookingDetails.findMany({
            include: {
              guests: {
              },
              rooms: {
              }
            }
          })
          return { bookings }

        }
      }
    }),
  getBookingByID: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input
      const booking = await ctx.db.bookingDetails.findUnique({
        where: {
          id
        },
        include: {
          guests: {
          },
          rooms: {
          }
        }
      })
      return { booking }
    }),

  updateBookingById: protectedProcedure
    .input(z.object({ id: z.string(), bookingStatus: z.custom<BookingStatus>() }))
    .mutation(async ({ ctx, input }) => {
      const { id, bookingStatus } = input
      const booking = await ctx.db.bookingDetails.update({
        where: {
          id
        },
        data: {
          bookingStatus
        }
      })
      return { booking }
    }),

});
