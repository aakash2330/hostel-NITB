

'use client';
import { Disclosure } from '@headlessui/react';
import { UserIcon } from "lucide-react"
import { BookingStatus, GuestHouse, GuestProfile, RoomDetails, RoomTariff } from '@prisma/client';
import { TypeOrg } from "@prisma/client";
import { useSession } from 'next-auth/react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Checkbox } from "~/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog"
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/trpc/react';
import { CreateGuestValidator, TCreateGuestValidator } from '~/utils/validators/guestValidators';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminGuestForm from '~/app/_components/guests/guestFormAdmin';


export default function Page() {
  const [guests, setGuests] = useState<GuestProfile[]>([])
  const [selectedGuests, setSelectedGuests] = useState<GuestProfile[]>([])
  const { toast } = useToast()
  const { data: session } = useSession();

  const createBookingMutation = api.booking.createBooking.useMutation({
    onSuccess: async ({ bookingDetails }) => {
      console.log({ bookingDetails })
      toast({
        title: "Booking Successful",
        description: "200",
      })

      setTimeout(() => { window.location.href = "/admin/bookings" })
    }
  })

  const getGuestsMutation = api.guests.getGuestsByUserId.useMutation({
    onSuccess: async ({ guests }) => {
      console.log({ guests })
      setGuests(guests)
    }
  })



  useEffect(() => { getGuestsMutation.mutate({ userId: session?.user.id ?? "" }) }, [])
  return (
    <>
      <main className="lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden">
        <div className="px-4 py-6 sm:px-6 lg:hidden">
          <div className="mx-auto flex max-w-lg">
            <a href="#">
              <span className="sr-only">Your Company</span>
            </a>
          </div>
        </div>
        <Dialog>
          <DialogContent className="no-scrollbar  p-10 flex justify-center items-center flex-wrap text-gray-600 " style={{ width: "50%", height: "90%", overflow: "auto" }}>
            <AdminGuestForm></AdminGuestForm>
          </DialogContent>
          <section
            aria-labelledby="payment-heading"
            className="flex-auto overflow-y-auto px-4  pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
          >
            <div className='flex justify-end items-end'>
              <Button onClick={() => {
                if (!selectedGuests.length) {
                  return alert("Please Select atleast 1 Guest")
                }
                [selectedGuests.forEach((guest) => {
                  createBookingMutation.mutate({
                    guestName: guest.name + Math.random(),
                    guestEmail: guest.email,
                    guestMobileNo: guest.mobileNo,
                    guestIdCardType: guest.identity_card_type, // Assuming DRIVING_LICENSE is an enum value for IDCardType
                    guestIdCardNo: guest.id_card_no,
                    guestIdCardUploaded: "YES", // Assuming YES is an enum value for Answer
                    guestAddress: guest.permanentAddress,
                    guestOfficeAdd: guest.orgAddress,
                    guestDesignation: guest.designation,
                    guestType: TypeOrg.PRIVATE, // Assuming CORPORATE is an enum value for TypeOrg
                    bookingOrderNo: "BOOK123456789",
                    bookingStatus: BookingStatus.VACANT, // Assuming CONFIRMED is an enum value for BookingStatus
                    hostelName: GuestHouse.SARAN_GUEST_HOUSE, // Assuming MAIN_GUEST_HOUSE is an enum value for GuestHouse
                    roomTarrif: RoomTariff.EXECTIVE_3500, // Assuming STANDARD is an enum value for RoomTariff
                    nosRoom: "2",
                    nosguest: "4",
                    updateBy: "Candidate",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    bookingDate: new Date().toISOString(),
                    bookedFromDt: new Date(),
                    bookedToDt: new Date(),
                    remark: "Looking forward to the stay.",
                    bookPaymentId: "cuid789payment" + Math.random() // This should be a valid ID from the `bookingPayments` table
                  })
                })]
              }}>Confirm Booking</Button>
            </div>
            {!!guests.length && <DialogTrigger className='text-center w-full text-sm font-bold'>+ Add New Guest</DialogTrigger>}
            <div className='w-full'>
              {!!!guests.length && <AdminGuestForm></AdminGuestForm>}
            </div>



            <div className='w-full'>
              {guests.map((g, index) => {
                return <li key={g.id + index} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <UserIcon></UserIcon>
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm"></h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                          <p className="text-gray-500">{g.name}</p>
                          <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">{g.gender}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms"
                          onCheckedChange={(checked: boolean) => {
                            setSelectedGuests((f) => {
                              if (checked) {
                                const updatedGuestList = [...f, g]
                                console.log({ updatedGuestList })
                                return updatedGuestList
                              } else {
                                const updatedGuestList = f.filter((item) => item.id !== g.id)
                                console.log({ updatedGuestList })
                                return updatedGuestList
                              }
                            });
                          }}

                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Add
                        </label>

                      </div>
                    </div>

                  </div>
                  <div className='text-xs text-red-400 border border-red-400 p-1 hover:bg-red-400 hover:text-white hover:cursor-pointer font-bold'>x</div>
                </li>
              })}
            </div>

          </section>

        </Dialog>
        {/* Checkout form */}
      </main>
    </>
  );
}

//<Checkbox
//  onCheckedChange={(checked: boolean) => {
//    setSelectedGuests((f) => {
//      if (checked) {
//        const updatedGuestList = [...f, g.id]
//        console.log(updatedGuestList);
//        console.log({ updatedGuestList })
//      } else {
//        const updatedGuestList = f.filter((item) => item !== g.id)
//        console.log({ updatedGuestList })
//        return updatedGuestList
//      }
//    });
//  }}
//  className="rounded-full border-none"
///>
//
//                <Button onClick={() => { onSubmit(form.getValues()) }} type="submit">Submit</Button>
