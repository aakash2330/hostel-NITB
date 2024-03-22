import { Answer, BookingStatus, Category, Country, Gender, GuestHouse, IDCardType, MaritalStatus, Nationality, Religion, RoomTariff, State, TypeOrg } from "@prisma/client";
import { z } from "zod";
import { CreateGuestValidator } from "./guestValidators";

export const CreateBookingValidator = z.object({
  hostelName: z.custom<GuestHouse>(),
  bookingDate: z.string(),
  bookedFromDt: z.date(),
  bookedToDt: z.date(),
  remark: z.string(),
  guestIds: z.array(z.string()).min(1),
  nosRooms: z.number().min(1)
})
export type TCreateBookingValidator = z.infer<typeof CreateGuestValidator>
