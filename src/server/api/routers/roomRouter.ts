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
      const roomDetails = await ctx.db.roomDetails.findMany({ include: { BookingDetails: true } })
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
        },
      include:{
        guests:true,
      }
      })
      const roomCharges = await ctx.db.roomCharges.findFirst({ where: { hostelName: roomDetails?.hostelName } })
      return { roomDetails, roomCharges }
    }),

  getRoomsByGuestHouse: publicProcedure
    .input(z.object({ guestHouse: z.custom<GuestHouse>() }))
    .query(async ({ ctx, input }) => {
      const { guestHouse } = input
      const roomDetails = await ctx.db.roomDetails.findMany({
        where: {
          hostelName: guestHouse

        },
        include: {
          BookingDetails: true,
          guests: true
        }
      })
      console.log({ roomDetails })
      return { roomDetails }
    }),


  getRoomByDetails: publicProcedure
    .input(z.object({ guestHouse: z.custom<GuestHouse>(), bookedFrom: z.date(), bookedTo: z.date(), bookingType: z.enum(["ROOM", "BEDS"]), quantity: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { guestHouse, bookedFrom, bookedTo, bookingType, quantity } = input
      if (bookingType == "BEDS") {
        console.log(`searching for ${quantity} ${bookingType} in a totally unbooked room`)
        let roomDetails = await ctx.db.roomDetails.findMany({
          where: {
            hostelName: guestHouse,
            BookingDetails: null,
          },
          include: {
            BookingDetails: true,
            guests: true
          }
        })
        if (roomDetails) {
          const filteredRooms = roomDetails.filter((r) => { if (+r.maxAdult - r.guests.length >= quantity) return true; else return false })
          if (!!filteredRooms.length) {
            return { roomDetails: filteredRooms[0] }
          }
        }
        else {
          let roomDetails = await ctx.db.roomDetails.findMany({
            where: {
              hostelName: guestHouse,
              BookingDetails: {
                OR: [
                  {
                    // Entirely before the given range
                    AND: [
                      { bookedToDt: { lt: bookedFrom } }, // Ends before the given start
                    ],
                  },
                  {
                    // Entirely after the given range
                    AND: [
                      { bookedFromDt: { gt: bookedTo } }, // Starts after the given end
                    ],
                  },
                ],
              },
            },
            include: {
              BookingDetails: true,
              guests: true
            }
          })
          if (roomDetails) {
            const filteredRooms = roomDetails.filter((r) => { if (+r.maxAdult - r.guests.length >= quantity) return true; else return false })
            if (!!filteredRooms.length) {
              return { roomDetails: filteredRooms[0] }
            }
          }
        }
      }
      else if (bookingType == "ROOM") {
        let roomDetails = await ctx.db.roomDetails.findFirst({
          where: {
            hostelName: guestHouse,
            BookingDetails: {
              OR: [
                {
                  // Entirely before the given range
                  AND: [
                    { bookedToDt: { lt: bookedFrom } }, // Ends before the given start
                  ],
                },
                {
                  // Entirely after the given range
                  AND: [
                    { bookedFromDt: { gt: bookedTo } }, // Starts after the given end
                  ],
                },
              ],
            }
          },
          include: {
            BookingDetails: true,
          }
        })
        if (roomDetails) {
          return { roomDetails }
        }
        else {
          roomDetails = await ctx.db.roomDetails.findFirst({
            where: {
              hostelName: guestHouse,
              BookingDetails: null
            },
            include: {
              BookingDetails: true
            }
          })
          if (roomDetails) {
            return { roomDetails }
          }
        }
      }
      return { roomDetails: null }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
