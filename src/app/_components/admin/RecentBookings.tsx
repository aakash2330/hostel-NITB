"use client"

import { BookingDetails } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';

export function RecentBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingDetails[]>([])
  const getAllBookingsMutation = api.booking.getAllBookings.useMutation({
    onSuccess: async ({ bookings }) => {
      console.log({ bookings })
      setBookings(bookings)
    }
  })
  useEffect(() => { getAllBookingsMutation.mutate() }, [])
  return (
    <div className="space-y-8 overflow-y-scroll no-scrollbar  cursor-pointer h-[50rem]">
      {bookings.map((b, index) => {
        return <div key={b.id + index} onClick={() => {
          router.push(`/admin/bookings?id=${b.id}`, { scroll: false })
        }} className="flex items-center p-3 rounded-2xl hover:bg-gray-200">
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{b.id}</p>
            <p className="text-sm text-muted-foreground">{b.bookingPersonName}</p>
          </div>
          <div className="ml-auto font-medium">{b.roomTarrif}</div>
        </div>
      })}
    </div>
  );
}
