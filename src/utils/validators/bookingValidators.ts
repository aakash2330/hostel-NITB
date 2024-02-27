import { Answer, BookingStatus, Category, Country, Gender, GuestHouse, IDCardType, MaritalStatus, Nationality, Religion, RoomTariff, State, TypeOrg } from "@prisma/client";
import { z } from "zod";
import { CreateGuestValidator } from "./guestValidators";

export const CreateBookingValidator = z.object({
  guestName: z.string(),
  guestEmail: z.string(),
  guestMobileNo: z.string(),
  guestIdCardType: z.custom<IDCardType>(),
  guestIdCardNo: z.string(),
  guestIdCardUploaded: z.custom<Answer>(),
  guestAddress: z.string(),
  guestOfficeAdd: z.string(),
  guestDesignation: z.string(),
  guestType: z.custom<TypeOrg>(),
  bookingOrderNo: z.string(),
  bookingStatus: z.custom<BookingStatus>(),
  hostelName: z.custom<GuestHouse>(),
  roomTarrif: z.custom<RoomTariff>(),
  nosRoom: z.string(),
  nosguest: z.string(),
  updateBy: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  bookingDate: z.string(),
  bookedFromDt: z.date(),
  bookedToDt: z.date(),
  remark: z.string(),
  bookPaymentId: z.string(),
})
export type TCreateBookingValidator = z.infer<typeof CreateGuestValidator>
