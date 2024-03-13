'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion"

import { Fragment, useState } from 'react';
import {
  Tab,
} from '@headlessui/react';
import { classNames } from '~/lib/classNames';
import Link from 'next/link';
import { GuestHouse, RoomDetails } from '@prisma/client';

const roomFeatures = {
  EXECUTIVE_GUEST_HOUESE: {
    description: "Experience comfort and convenience in our thoughtfully appointed single room at Saran Guesthouse, nestled within the serene campus of NITTTR Bhopal. Perfect for solo travelers seeking a peaceful retreat, our single room offers a cozy sanctuary equipped with modern amenities for a relaxing stay. Immerse yourself in tranquility while enjoying easy access to nearby attractions and facilities. Book your stay with us for a rejuvenating experience in the heart of Bhopal.",
    features: ["Double Bed: Sink into plush bedding for a restful night's sleep", "Ensuite Bathroom: Enjoy the convenience of a private bathroom equipped with modern amenities.", "Workspace: Stay productive with a dedicated workspace, ideal for business travelers.", "Complimentary Wi-Fi: Stay connected with high-speed internet access throughout your stay.", "Air Conditioning: Stay cool and comfortable in any season."]
  },
  SARAN_GUEST_HOUSE: {
    description: "Discover spacious and cozy double rooms at NITTTR Bhopal, ideal for couples or friends traveling together. Enjoy a comfortable stay with modern amenities. Book your room now!",
    features: ["attached toilets and bathrooms", "It has separate kitchen and dining facility", " All the rooms are air conditioned and equipped with all modern amenities."]
  },
  VISHVESHVARAYA_GUEST_HOUSE: {
    description: "It has G +1 floor with 26 double bedded rooms with attached toilets and bathrooms. It has separate kitchen and dining facility. All the rooms are air conditioned and equipped with all modern amenities.",
    features: ["attached toilets and bathrooms", "It has separate kitchen and dining facility", " All the rooms are air conditioned and equipped with all modern amenities."]
  }
}

function ProductHeroSlider({ roomDetails }: { roomDetails: RoomDetails }) {
  console.log({ roomDetails })
  const [open, setOpen] = useState(false);
  console.log('inside');
  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto p-2 mt-6 w-full max-w-2xl lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6 ">
                  {roomDetails.roomImg.map((image, index) => (
                    <Tab
                      key={image + index}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image}</span>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={image}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? 'ring-indigo-500' : 'ring-transparent',
                              'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>

                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {roomDetails.roomImg.map((image, index) => (
                  <Tab.Panel key={image + index}>
                    <img
                      src={image}
                      alt={image}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-lg md:text-3xl font-bold tracking-tight text-gray-900">
                {roomDetails.code}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  {roomDetails.totalChargePerDay}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                  </div>
                  <p className="sr-only">{"product.rating"} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  className="space-y-6 text-base text-gray-700"
                  dangerouslySetInnerHTML={{ __html: roomFeatures[roomDetails.hostelName].description }}
                />
              </div>

              <form className="mt-6">
                {/* Colors */}

                <div className="mt-10 flex">
                  <Link href={`/checkout?id=${roomDetails.id}`} className='w-full'>
                    <button
                      type="submit"
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                    >
                      Book Now
                    </button>
                  </Link>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it Available?</AccordionTrigger>
                    <AccordionContent>Yes</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Features</AccordionTrigger>
                    {roomFeatures[roomDetails.hostelName].features.map((d, index) => {
                      return <AccordionContent key={d + index}>
                        {d}
                      </AccordionContent>
                    })}

                  </AccordionItem>

                </Accordion>

              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductHeroSlider;
