
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import Backpack from "public/backpack-icon-flat-style-vector-20186178.jpg"
import Image from "next/image";
import Link from "next/link";
import { BookingDetails } from "@prisma/client";
import { Separator } from "~/components/ui/separator";
import { RouterOutputs } from "~/trpc/shared";
import { TCreateBookingValidator, TbookingsValidator, bookingsValidator } from "~/utils/validators/bookingValidators";

export default function SingleBookingsCard({ booking }: { booking: TbookingsValidator }) {
  return <Card className="p-10 grid grid-cols-5 justify-center items-center">
    <div className="col-span-2 justify-center items-center gap-2  flex flex-col">
      <div className="text-sm font-bold underline">Upcoming Booking</div>
      <div className="flex justify-center gap-6 text-sm items-center">
        <Image src={booking.rooms[0]?.roomImg[0] ?? Backpack} width={100} height={100} alt="Backpack"></Image>
        <div className="flex flex-col">
          <div className="font-extrabold">{booking.hostelName}</div>
          <div className="flex justify-center items-center gap-4">
            <div className="text-xs">{(booking.bookedFromDt.toString())}</div>
            <div><Separator orientation="vertical" className="h-10"></Separator></div>
            <div className="text-xs">{(booking.bookedToDt.toString())}</div></div>
          <div className="text-xs text-gray-600">{booking.bookingStatus}</div>
        </div>
      </div>
    </div>
    <div className="col-span-2 col-start-4  space-y-2">
      <div className="font-extrabold">Booking Id - {booking.id}</div>
      <div className="text-sm text-gray-500">Booked On - {booking.bookingDate.toString()}</div>
      <div className="flex gap-4 flex-wrap items-center justify-start text-sm "> Guests - {booking.guests.length} </div>
    </div>
  </Card>
}
