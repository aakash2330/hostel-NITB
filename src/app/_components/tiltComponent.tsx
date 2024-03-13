
'use client';
import Image from 'next/image';
import Link from 'next/link';
import Tilt from 'react-parallax-tilt';
export default function TiltComponent({ img }: { img: any }) {

  return <div className="">
    <Link href={"/"}>
      <Tilt>
        <div
          key={1}
          className="group relative flex flex-col overflow-hidden rounded-lg border border-white bg-white"
        >
          <div
            className={`${true
              ? 'aspect-h-3 aspect-w-4 '
              : 'aspect-h-4 aspect-w-3'
              } sm:aspect-none sm:h-100`}
          >
            <img
              width={100}
              height={100}
              src={img}
              alt={""}
              className="h-full w-full object-cover object-center sm:h-full sm:w-full"
            />
          </div>
          <div className="flex flex-1 flex-col space-y-2 p-4">
            <div className="flex flex-1 flex-col justify-end">
            </div>
          </div>
        </div>
      </Tilt>
    </Link>

  </div>
}
