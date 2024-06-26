"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";
import {
  BookingDetails,
  GuestHouse,
  RoomCharges,
  TypeOrg,
} from "@prisma/client";
import { useState } from "react";
import {
  TbookingsValidator,
  emptyBooking,
} from "~/utils/validators/bookingValidators";
import { useRouter } from "next/navigation";
import downloadToExcel from "~/lib/xlsx";
import { api } from "~/trpc/react";
import { removeUnderscore } from "~/lib/utils";

function findRoomCharge(
  roomCharges: RoomCharges[],
  booking: TbookingsValidator,
  typeOrg: TypeOrg,
) {
  const rates = roomCharges.find((r) => {
    return r.hostelName == booking.hostelName;
  });
  if (rates) {
    return rates[typeOrg];
  } else return 0;
}

export default function AdminDashboardV2({
  bookings,
  hostelName,
  roomCharges,
}: {
  bookings: TbookingsValidator[];
  hostelName: GuestHouse;
  roomCharges: RoomCharges[];
}) {
  const [selectedBooking, setSelectedBooking] = useState<TbookingsValidator>(
    bookings[0] ?? emptyBooking,
  );
  const router = useRouter();
  const sendMailMutation = api.mail.sendMail.useMutation();
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card className="sm:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle>Manage Bookings</CardTitle>
                    <CardDescription className="max-w-lg text-balance leading-relaxed">
                      Manage Bookings with Insightful Analysis.
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button>
                      <Link href={"/admin/bookings/create"}>
                        Create New Bookings
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Confirmed Bookings</CardDescription>
                    <CardTitle className="text-4xl">
                      {bookings.reduce((a, c) => {
                        return c.bookingStatus == "CONFIRMED" ? a + 1 : a;
                      }, 0)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Out of Total {bookings.length} bookings
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress
                      value={
                        5 *
                        bookings.reduce((a, c) => {
                          return c.bookingStatus == "CONFIRMED" ? a + 1 : a;
                        }, 0)
                      }
                    />
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Unconfirmed Bookings</CardDescription>
                    <CardTitle className="text-4xl">
                      {bookings.reduce((a, c) => {
                        return c.bookingStatus == "UNCONFIRMED" ? a + 1 : a;
                      }, 0)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Out of Total {bookings.length} bookings
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Progress
                      value={
                        bookings.length -
                        bookings.reduce((a, c) => {
                          return c.bookingStatus == "UNCONFIRMED" ? a + 1 : a;
                        }, 0)
                      }
                    />
                  </CardFooter>
                </Card>
              </div>
              <Tabs defaultValue={hostelName ?? "all"}>
                <div className="flex items-center">
                  <TabsList>
                    <TabsTrigger
                      onClick={() => {
                        router.push(`/admin`, { scroll: false });
                      }}
                      value="all"
                    >
                      All
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        router.push(
                          `/admin?hostel=${GuestHouse.SARAN_GUEST_HOUSE}`,
                          { scroll: false },
                        );
                      }}
                      value={GuestHouse.SARAN_GUEST_HOUSE}
                    >
                      Saran
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        router.push(
                          `/admin?hostel=${GuestHouse.VISHVESHVARAYA_GUEST_HOUSE}`,
                          { scroll: false },
                        );
                      }}
                      value={GuestHouse.VISHVESHVARAYA_GUEST_HOUSE}
                    >
                      Vishveshvaraya
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        router.push(
                          `/admin?hostel=${GuestHouse.EXECUTIVE_GUEST_HOUSE}`,
                          { scroll: false },
                        );
                      }}
                      value={GuestHouse.EXECUTIVE_GUEST_HOUSE}
                    >
                      Executive
                    </TabsTrigger>
                  </TabsList>
                  <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 gap-1 text-sm"
                        >
                          <ListFilter className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only">Filter</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem checked>
                          Booked
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Canceled
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>
                          Confirmed
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 gap-1 text-sm"
                    >
                      <File className="h-3.5 w-3.5" />
                      <span
                        onClick={() => downloadToExcel({ bookings })}
                        className="sr-only sm:not-sr-only"
                      >
                        Export
                      </span>
                    </Button>
                  </div>
                </div>
                <TabsContent value="all">
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>All Bookings</CardTitle>
                      <CardDescription>Recent Bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                        columns={columns()}
                        data={bookings}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value={GuestHouse.SARAN_GUEST_HOUSE}>
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>{removeUnderscore(GuestHouse.SARAN_GUEST_HOUSE)}</CardTitle>
                      <CardDescription>Recent Bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                        columns={columns()}
                        data={bookings}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value={GuestHouse.VISHVESHVARAYA_GUEST_HOUSE}>
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>
                        {removeUnderscore(GuestHouse.VISHVESHVARAYA_GUEST_HOUSE)}
                      </CardTitle>
                      <CardDescription>Recent Bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                        columns={columns()}
                        data={bookings}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value={GuestHouse.EXECUTIVE_GUEST_HOUSE}>
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>{removeUnderscore(GuestHouse.EXECUTIVE_GUEST_HOUSE)}</CardTitle>
                      <CardDescription>Recent Bookings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <DataTable
                        selectedBooking={selectedBooking}
                        setSelectedBooking={setSelectedBooking}
                        columns={columns()}
                        data={bookings}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            <div>
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      Booking Id - {selectedBooking.id}
                    </CardTitle>
                    <CardDescription>
                      {selectedBooking.createdAt.toDateString()}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                  <div className="grid gap-3">
                    <div className="font-semibold">Hostel Name</div>
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          {selectedBooking.hostelName}
                        </span>
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <div className="font-semibold">Room Details</div>
                    <ul className="grid gap-3">
                      {selectedBooking.rooms.map((r) => {
                        return (
                          <li
                            key={r.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground">
                              {r.code}
                            </span>
                            <span>{r.rentPerDay}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <Separator className="my-2" />
                    <div className="font-semibold">Guests Details</div>
                    <ul className="grid gap-3">
                      {selectedBooking.guests.map((g) => {
                        return (
                          <li
                            key={g.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-muted-foreground">
                              {g.name}
                            </span>
                            <span>{g.email}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <Separator className="my-2" />
                    <ul className="grid gap-3">
                      <li className="flex items-center justify-between font-semibold">
                        <span className="text-muted-foreground">Total</span>
                        <span>
                          ₹
                          {selectedBooking.guests.reduce((a, c) => {
                            return (
                              a +
                              findRoomCharge(
                                roomCharges,
                                selectedBooking,
                                c.typeOrg,
                              )
                            );
                          }, 0)}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-3">
                      <div className="font-semibold">Check In</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>
                          {selectedBooking.bookedFromDt.toDateString()}
                        </span>
                      </address>
                    </div>
                    <div className="grid auto-rows-max gap-3">
                      <div className="font-semibold">Check Out</div>
                      <div className="text-muted-foreground">
                        {selectedBooking.bookedToDt.toDateString()}
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <div className="font-semibold">Status</div>
                      <address className="grid gap-0.5 not-italic text-muted-foreground">
                        <span>{selectedBooking.bookingStatus}</span>
                      </address>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Customer Name</dt>
                        <dd>{selectedBooking.guests[0]?.name}</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Email</dt>
                        <dd>
                          <a href="mailto:">
                            {selectedBooking.guests[0]?.email}
                          </a>
                        </dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">Phone</dt>
                        <dd>{selectedBooking.guests[0]?.mobileNo}</dd>
                      </div>
                    </dl>
                  </div>
                  <Separator className="my-4" />
                  <div className="grid gap-3">
                    <div className="font-semibold">Payment Information</div>
                    <dl className="grid gap-3">
                      <div className="flex items-center justify-between">
                        <dt className="flex items-center gap-1 text-muted-foreground">
                          <CreditCard className="h-4 w-4" />
                          Visa
                        </dt>
                        <dd>**** **** **** 4532</dd>
                      </div>
                    </dl>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                  <div className="text-xs text-muted-foreground">
                    Updated{" "}
                    <time dateTime="2023-11-23">
                      {new Date().toDateString()}
                    </time>
                  </div>
                  <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                          <span className="sr-only">Previous Order</span>
                        </Button>
                      </PaginationItem>
                      <PaginationItem>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                          <span className="sr-only">Next Order</span>
                        </Button>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
