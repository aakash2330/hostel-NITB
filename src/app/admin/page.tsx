import { api } from "~/trpc/server";
import MyBookings from "../_components/Booking/myBookings";
import AdminConsole from "../_components/admin/AdminConsole";
import { GuestHouse } from "@prisma/client";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const hostelName = searchParams?.hostel as GuestHouse
  if (hostelName) {
    const { bookings } = await api.booking.getAllBookings.mutate({ hostelName })
    return <AdminConsole hostelName={hostelName} key={Math.random()} bookings={bookings}></AdminConsole>
  }
  else {
    const { bookings } = await api.booking.getAllBookings.mutate({})
    return <AdminConsole hostelName={hostelName} key={Math.random()} bookings={bookings}></AdminConsole>
  }
}
