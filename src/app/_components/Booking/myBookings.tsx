"use client"
import Link from "next/link";
import { RecentBookings } from "~/app/_components/admin/RecentBookings";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/server";
import { useState } from "react";
import { formatObject } from "~/lib/formatNestedObjects";
import { BookingDetails } from "@prisma/client";
import NoBookingsCard from "./noBookingsCard";
import SingleBookingsCard from "./singleBookingCard";
import { TbookingsValidator } from "~/utils/validators/bookingValidators";

// Usage in a component
const emptyBooking: TbookingsValidator = {
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
export default function MyBookings({ bookings }: { bookings: TbookingsValidator[] }) {
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails>(bookings[0] ?? emptyBooking)
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            My Bookings
          </h2>
        </div>
        <SingleBookingsCard booking={bookings[0] ?? emptyBooking}></SingleBookingsCard>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 md:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentBookings selectedBooking={selectedBooking} setSelectedBooking={setSelectedBooking} bookings={bookings} />
                </CardContent>
              </Card>

              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 overflow-auto">
                    <code className="text-white text-xs md:text-sm">
                      {Object.keys(selectedBooking ?? {}).map((key) => {
                        const value = selectedBooking![key as keyof typeof selectedBooking];
                        const formattedValue = typeof value === 'object' && value !== null
                          ? `\n${formatObject(value)}`
                          : value
                        return key != "guests" && key != "rooms" && <div key={key}>{`${key} - ${formattedValue}`}</div>;
                      })}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}


