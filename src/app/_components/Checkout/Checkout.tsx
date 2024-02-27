

'use client';
import { Disclosure } from '@headlessui/react';
import { UserIcon } from "lucide-react"
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingStatus, GuestHouse, GuestProfile, RoomDetails } from '@prisma/client';
import { Answer, Category, Country, Gender, IDCardType, MaritalStatus, Nationality, Religion, State, TypeOrg } from "@prisma/client";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Checkbox } from "~/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { useToast } from '~/components/ui/use-toast';
import { api } from '~/trpc/react';
import { CreateGuestValidator, TCreateGuestValidator } from '~/utils/validators/guestValidators';
import { stat } from 'fs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export default function Checkout({ roomDetails }: { roomDetails: RoomDetails }) {
  const [guests, setGuests] = useState<GuestProfile[]>([])
  const [selectedGuests, setSelectedGuests] = useState<GuestProfile[]>([])
  const { toast } = useToast()
  const { data: session } = useSession();
  const createGuestMutation = api.guests.createGuest.useMutation({
    onSuccess: async ({ guest }) => {
      console.log({ guest })
      window.location.reload()
    }
  })

  const createBookingMutation = api.booking.createBooking.useMutation({
    onSuccess: async ({ bookingDetails }) => {
      console.log({ bookingDetails })
      toast({
        title: "Booking Successful",
        description: "200",
      })
      setTimeout(() => { window.location.href = "/" }, 2000)
    }
  })

  const getGuestsMutation = api.guests.getGuestsByUserId.useMutation({
    onSuccess: async ({ guests }) => {
      console.log({ guests })
      setGuests(guests)
    }
  })

  const form = useForm<z.infer<typeof CreateGuestValidator>>({
    resolver: zodResolver(CreateGuestValidator),
    defaultValues: {
      name: "",
      email: "",
      alternativeEmail: "",
      mobileNo: "",
      alternativeMobileNo: "",
      typeOrg: "PRIVATE",
      orgEmail: "",
      orgPhone: "",
      physicallyChallenged: "NO",
      orgAddress: "",
      country: "INDIA",
      residentialCity: "",
      residentialDistt: "",
      residentialState: "MAHARASTRA",
      orgName: "",
      orgWebsite: "",
      designation: "",
      nationality: "NRI",
      religion: "HINDU",
      fatherHusbandName: "",
      id_card_no: "",
      identity_card_type: "AADHAR",
      maritalStatus: "MARRIED",
      remark: "",
      dob: new Date(),
      permanentAddress: "",
      localAddress: "",
      category: "SC",
      gender: "MALE",
    }
  })
  const x: TCreateGuestValidator = {
    name: "",
    email: "",
    alternativeEmail: "",
    mobileNo: "",
    alternativeMobileNo: "",
    typeOrg: "PRIVATE",
    orgEmail: "",
    orgPhone: "",
    physicallyChallenged: "NO",
    orgAddress: "",
    country: "INDIA",
    residentialCity: "",
    residentialDistt: "",
    residentialState: "MAHARASTRA",
    orgName: "",
    orgWebsite: "",
    designation: "",
    nationality: "NRI",
    religion: "HINDU",
    fatherHusbandName: "",
    id_card_no: "",
    identity_card_type: "AADHAR",
    maritalStatus: "MARRIED",
    remark: "",
    dob: new Date(),
    permanentAddress: "",
    localAddress: "",
    category: "SC",
    gender: "MALE",
  }

  function onSubmit(data: z.infer<typeof CreateGuestValidator>) {
    console.log({ data })
    createGuestMutation.mutate(data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

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

        <h1 className="sr-only">Checkout</h1>

        {/* Mobile order summary */}
        <section
          aria-labelledby="order-heading"
          className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden"
        >
          <Disclosure as="div" className="mx-auto max-w-lg">
            {({ open }) => (
              <>
                <div className="flex items-center justify-between">
                  <h2
                    id="order-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Your Order
                  </h2>
                  <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                    {open ? (
                      <span>Hide full summary</span>
                    ) : (
                      <span>Show full summary</span>
                    )}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel>
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 border-b border-gray-200"
                  >
                    {[roomDetails].map((room, index) => (
                      <li key={room.id + index} className="flex space-x-6 py-6">
                        <img
                          src={"https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                          alt={"https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                          className="h-40 w-40 flex-none rounded-md bg-gray-200 object-cover object-center"
                        />
                        <div className="flex flex-col justify-between space-y-4">
                          <div className="space-y-1 text-sm font-medium">
                            <h3 className="text-gray-900">{room.code}</h3>
                            <p className="text-gray-900">{room.value}</p>
                          </div>
                          <div className="flex space-x-4">
                            <div className="flex border-l border-gray-300 pl-4">
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd className="text-gray-900">₹{100}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="flex">
                        Discount
                        <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                          {"DISCOUNT CODE"}
                        </span>
                      </dt>
                      <dd className="text-gray-900">₹{100}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Taxes</dt>
                      <dd className="text-gray-900">₹{100}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd className="text-gray-900">₹{100}</dd>
                    </div>
                  </dl>
                </Disclosure.Panel>

              </>
            )}
          </Disclosure>
        </section>

        {/* Order summary */}
        <section
          aria-labelledby="summary-heading"
          className="hidden w-full max-w-md flex-col bg-gray-50 lg:flex"
        >
          <h2 id="summary-heading" className="sr-only">
            Order summary
          </h2>

          <ul
            role="list"
            className="flex-auto divide-y h-fit divide-gray-200 overflow-y-auto px-6"
          >
            {[roomDetails].map((room, index) => (
              <li key={room.id + index} className="flex space-x-6 py-6">
                <img
                  src={"https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  alt={"https://plus.unsplash.com/premium_photo-1663126298656-33616be83c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  className="h-24 w-24 flex-none rounded-md bg-gray-200 object-cover object-center"
                />
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-1 text-sm font-medium">
                    <h3 className="text-gray-900">{room.value}</h3>
                    <h3 className="text-gray-900">{room.code}</h3>
                    <p className="text-gray-900">₹{room.totalChargePerDay}</p>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex border-l border-gray-300 pl-4">
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="sticky bottom-0 flex-none border-t border-gray-200 bg-gray-50 p-6">
            <dl className="mt-10 space-y-6 text-sm font-medium text-gray-500">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="text-gray-900">₹{100}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="flex">
                  Discount
                  <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs tracking-wide text-gray-600">
                    {"DISCOUNT CODE"}
                  </span>
                </dt>
                <dd className="text-gray-900">₹{100}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Taxes</dt>
                <dd className="text-gray-900">₹{100}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Shipping</dt>
                <dd className="text-gray-900">₹{100}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <dt className="text-base">Total</dt>
                <dd className="text-gray-900">₹{100}</dd>
              </div>
            </dl>
          </div>
        </section>
        <Dialog>
          <DialogContent className="no-scrollbar  p-10 flex justify-center items-center flex-wrap text-gray-600 " style={{ width: "50%", height: "90%", overflow: "auto" }}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
                {Object.keys(x).map((key: any, index) => {
                  if (key != "typeOrg" && key != "physicallyChallenged" && key != "maritalStatus" && key != "residentialState" && key != "nationality" && key != "identity_card_type" && key != "gender" && key != "category" && key != "religion" && key != "country" && key != "userId") {
                    return <FormField
                      control={form.control}
                      key={key + index}
                      name={key}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{key}</FormLabel>
                          <FormControl>
                            <Input placeholder={key} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  }
                })}
                <FormField
                  control={form.control}
                  name="typeOrg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>typeOrg</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a typeOrg" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(TypeOrg).map((t, index) => {
                            return <SelectItem key={t + index} value={t}>{t}</SelectItem>

                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="physicallyChallenged"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Physically Challenged</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select if physically challenged" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Answer).map((p, index) => {
                            return <SelectItem key={p + index} value={p}>{p}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Indicate if you have any physical challenges for appropriate accommodations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /><FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marital Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your marital status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(MaritalStatus).map((m, index) => {
                            return <SelectItem key={m + index} value={m}>{m}</SelectItem>
                          })}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your marital status helps us to provide better services tailored to your needs.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your nationality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Nationality).map((n, index) => (
                            <SelectItem key={n + index} value={n}>{n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Your nationality is required for demographic purposes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="residentialState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Residential State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your residential state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(State).map((state, index) => (
                            <SelectItem key={state + index} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the state of your permanent residence.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Country).map((country, index) => (
                            <SelectItem key={country + index} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the country of your citizenship. This is required for legal and administrative purposes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Religion</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your religion" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Religion).map((religion, index) => (
                            <SelectItem key={index + religion} value={religion}>{religion}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select your religion or belief system. This information is optional and for demographic purposes only.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Category).map((category, index) => (
                            <SelectItem key={index + category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select the category that best describes you or your organization.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Gender).map((gender, index) => (
                            <SelectItem key={gender + index} value={gender}>{gender}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        We ask for gender information for no other reason than to address you correctly.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="identity_card_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identity Card Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your ID card type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(IDCardType).map((t, index) => (
                            <SelectItem key={t + index} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the type of identification document you will provide.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogContent>
          <section
            aria-labelledby="payment-heading"
            className="flex-auto overflow-y-auto px-4  pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0"
          >
            <div className='flex justify-end items-end'>
              <Button onClick={() => {
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
                    roomTarrif: roomDetails.roomTarrif, // Assuming STANDARD is an enum value for RoomTariff
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
            <DialogTrigger className='text-center w-full text-sm font-bold'>+ Add New Guest</DialogTrigger>

            <>
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
                </li>
              })}
            </>

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
