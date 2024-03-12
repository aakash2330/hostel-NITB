"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Marker } from 'react-map-gl';
import Image from 'next/image';
import { formatGuests, formatRangeDate } from "~/utils";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { RoomDetails, RoomType } from '@prisma/client';
import { api } from '~/trpc/react';
import { Separator } from "~/components/ui/separator"

import img1 from "public/IMG_5599.png"
import img2 from "public/IMG_5621.png"
import img3 from "public/IMG_5623.png"
import img4 from "public/IMG_5624.png"
import AppPlaceCard from '../PlaceCard';
import SearchForm from '../SearchForm';
import { router } from '@trpc/server';
const imagesCollection = [img1, img2, img3, img4]

const SearchPage = () => {
  const searchParams = useSearchParams()
  const xcheckIn = searchParams.get('checkin')
  const xcheckOut = searchParams.get('checkout')
  const xchildren = searchParams.get('group_children')
  const xAdults = searchParams.get('group_adults')
  const xguests = { children: xchildren, adults: xAdults }
  const xlocation = searchParams.get('location')


  const [location, setLocation] = useState<string>('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState<Object>();
  const [roomDetails, setRoomDetails] = useState<RoomDetails[]>()
  useEffect(() => {
    setLocation(xlocation?.toString()!);
    if (xcheckIn) setCheckIn(new Date(xcheckIn?.toString()));
    if (xcheckOut) setCheckOut(new Date(xcheckOut?.toString()));
    if (xguests) setGuests(xguests);
  }, []);

  const getGuests = (guests: any) => {
    const totalGuests = formatGuests(guests, { noInfants: true });
    if (totalGuests) return `• ${totalGuests}`;
  };

  const getDates = (startDate: any, endDate: any) => {
    const dates = formatRangeDate(startDate, endDate);
    if (dates) return `• ${dates}`;
  };

  const roomDetailsMutation = api.room.getAllRooms.useMutation({
    onSuccess: async ({ roomDetails }) => {
      console.log({ roomDetails })
      setRoomDetails(roomDetails)
    }
  })
  useEffect(() => {
    roomDetailsMutation.mutate()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <main
        className={` flex-grow grid grid-cols-1  duration-500`}
      >

        <SearchForm />
        {/* left - cards */}
        <div
          className={`px-4 py-8 duration-500 lg:py-12 lg:px-7`}
        >
          <span className="inline-block mb-2 text-sm text-gray-500">
            Stays {checkIn && getDates(checkIn, checkOut)}{' '}
            {guests && getGuests(guests)}
          </span>
          {/* title */}
          <h1 className="mb-2 text-2xl font-semibold md:text-3xl lg:text-4xl lg:mb-7">
            Stays in {location}
          </h1>
          {/* filters */}
          <div className="mb-4 space-x-1 space-y-2 text-gray-400 md:space-x-2 lg:mb-8">
            {Object.keys(RoomType).map((room, index) => {
              return <button key={index} className="px-2 py-1 text-xs duration-300 border border-gray-500 border-opacity-50 rounded-full cursor-pointer md:px-4 md:py-2 lg:text-sm active:scale-90 hover:border-gray-500">
                {room}
              </button>
            })}

          </div>
          {/* information */}
          <p className="mb-4 text-sm text-gray-400">
            Review COVID-19 travel restrictions before you book.{' '}
            <Link href="/">
              Learn more
            </Link>
          </p>
          {/* list */}
          <section className='flex flex-col gap-5'>
            {roomDetails?.map((room, index) => (

              <div key={index}>
                <Link href={`/hostel/${room.id}`}>
                  <AppPlaceCard key={room.id} data={room} img={imagesCollection[index] ?? "https://plus.unsplash.com/premium_photo-1674676471380-1258cb31b3ac?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} />
                </Link>
                <Separator />
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
