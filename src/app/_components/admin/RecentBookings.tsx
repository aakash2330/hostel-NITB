"use client"

import { BookingDetails } from "@prisma/client";
import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { Separator } from "~/components/ui/separator";

export function RecentBookings({ bookings, setSelectedBooking, selectedBooking }: { bookings: BookingDetails[], setSelectedBooking: Function, selectedBooking: BookingDetails }) {
  return (
    <div className="space-y-8 overflow-y-scroll text-xs no-scrollbar  cursor-pointer h-full">
      {bookings.map((b, index) => {
        return <div key={b.id + index} onClick={() => {
          setSelectedBooking(b)
        }} className={`flex items-center p-3 rounded-2xl hover:bg-gray-200 ${selectedBooking.id == b.id ? "bg-gray-200" : ""}`}>
          <div className="ml-4 space-y-1">
            <p className="text-sm md:font-medium leading-none">Booking Id - {b.id}</p>
            <div className="text-xs">{(b.bookedFromDt.toString())}</div>
            <div><Separator orientation="vertical" className="h-4"></Separator></div>
            <div className="text-xs">{(b.bookedToDt.toString())}</div>
          </div>
          <div className="ml-auto hidden md:block font-medium">{b.hostelName}</div>
        </div>
      })}
    </div>
  );
}
