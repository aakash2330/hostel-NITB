"use client"

import { BookingDetails } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export function RecentBookings({ userId }: { userId?: string }) {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingDetails[]>([])
  const getAllBookingsMutation = api.booking.getAllBookings.useMutation({
    onSuccess: async ({ bookings }) => {
      setBookings(bookings)
    }
  })
  useEffect(() => {
    userId != "" ? getAllBookingsMutation.mutate({}) : getAllBookingsMutation.mutate({ userId })
  }, [])
  return (
    <div className="space-y-8 overflow-y-scroll text-xs no-scrollbar  cursor-pointer h-[50rem]">
      {bookings.map((b, index) => {
        return <div key={b.id + index} onClick={() => {
          router.push(userId != "" ? `/admin/bookings?id=${b.id}` : `/myBookings?id=${b.id}`, { scroll: false })
        }} className="flex items-center p-3 rounded-2xl hover:bg-gray-200">
          <div className="ml-4 space-y-1">
            <p className="text-sm md:font-medium leading-none">{b.id}</p>
            <p className="text-sm text-muted-foreground">{b.userId}</p>
            <div className="ml-auto md:hidden font-medium">{b.hostelName}</div>
          </div>
          <div className="ml-auto hidden md:block font-medium">{b.updateBy}</div>
        </div>
      })}
    </div>
  );
}
