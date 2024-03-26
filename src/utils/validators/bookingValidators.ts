import { Answer, BookingStatus, Category, Country, Gender, GuestHouse, IDCardType, MaritalStatus, Nationality, Prisma, Religion, RoomTariff, State, TypeOrg } from "@prisma/client";
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

export const bookingsValidator = Prisma.validator<Prisma.BookingDetailsFindManyArgs>()({
  include: {
    guests: true,
    rooms: true
  }
});
export type TbookingsValidator = Prisma.BookingDetailsGetPayload<
  typeof bookingsValidator
>;

export const emptyBooking: TbookingsValidator = {
  id: "",
  bookingStatus: "BOOKED",
  hostelName: "SARAN_GUEST_HOUSE",
  updateBy: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  bookingDate: new Date(),
  bookedFromDt: new Date(),
  bookedToDt: new Date(),
  remark: "",
  bookPaymentId: "",
  userId: "",
  guests: [],
  rooms: []
}
