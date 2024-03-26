import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { authOptions, getServerAuthSession } from "~/server/auth";
import { TbookingsValidator } from "~/utils/validators/bookingValidators";
import hostelImg from "public/IMG_5622.png"

export default async function BookingConfirmed({ booking }: { booking: TbookingsValidator }) {
  const session = await getServerAuthSession();
  return <div className="flex flex-col gap-10">
    <div>
      <div className="text-3xl text-green-500">Great! Your stay is confirmed</div>
      <div className="text-sm font-light">You'll soon recieve a confirmation email</div>
    </div>
    <Card className="p-10 flex flex-col gap-10 shadow-2xl">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-gray-600">Booking Id</div>
          <div className="font-extrabold">{booking.id}</div>
        </div>
        <div>
          <div className="text-gray-600">Booked By</div>
          <div className="font-extrabold">{session?.user.name}</div>
        </div>

      </div>
      <Separator></Separator>
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <div>
            <div className="text-gray-600">Hostel Name</div>
            <div className="font-extrabold">{booking.hostelName}</div>
          </div>

          <div>
            <div className="text-gray-600">Remarks</div>
            <div className="text-xs font-light">{booking.remark == "" ? "none" : booking.remark}</div>
          </div>

        </div>
        <div>
          <div className="text-gray-600 text-sm">{booking.bookingDate.toLocaleDateString()}</div>
        </div>
        <div className="relative size-40">
          <Image fill src={booking.rooms[0]?.roomImg[0] ?? hostelImg} alt=""></Image>
        </div>
      </div>
      <Separator></Separator>
      <div className="grid grid-cols-4 justify-between text-sm  items-center">
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-gray-600">Primary guest</div>
            <div className="font-extrabold">{booking.guests[0]?.name}</div>
          </div>
          <div>
            <div className="text-gray-600">Contact</div>
            <div className="font-extrabold">{booking.guests[0]?.mobileNo}</div>
          </div>
          <div>
            <div className="text-gray-600">Email</div>
            <div className="font-extrabold">{booking.guests[0]?.email}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="text-gray-600">Check In</div>
            <div className="font-extrabold">{booking.bookedFromDt.toLocaleDateString()}</div>
          </div>
          <div>
            <div className="text-gray-600">Check Out</div>
            <div className="font-extrabold">{booking.bookedToDt.toLocaleDateString()}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="text-gray-600">Check In Time</div>
            <div className="font-extrabold">{booking.bookedFromDt.toLocaleTimeString()}</div>
          </div>
          <div>
            <div className="text-gray-600">Check Out Time</div>
            <div className="font-extrabold">{booking.bookedToDt.toLocaleTimeString()}</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div className="text-gray-600">Status</div>
            <div className="font-extrabold">{booking.bookingStatus}</div>
          </div>
          <div>
            <div className="text-gray-600">Rooms</div>
            <div className="font-extrabold">{booking.rooms.map((r) => { return <div>{r.code}</div> })}</div>
          </div>
        </div>
      </div>
      <Separator></Separator>
      <div className="space-y-3">
        <div className="font-extrabold">Payment Details</div>
        <div className="flex justify-between items-center">
          <div className="text-sm">Total Amount Paid</div>
          <div className="text-sm font-extrabold">₹{2000}</div>
        </div>
      </div>
    </Card>
  </div>

}
