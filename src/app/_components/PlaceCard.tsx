import Image, { StaticImageData } from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from "next/link";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";



const AppPlaceCard = ({
  data,
  img,
  room,
  checkIn,
  checkOut,
  xBookingType,
}: any) => {
  return (
    <div className="pt-4 flex max-w-xs flex-col rounded-xl border border-gray-300 bg-gray-300 bg-gradient-to-tr from-slate-100 p-4">
      {/* left - image */}
      <div className="relative mb-2 h-52 w-full sm:h-44 md:mb-0 ">
        <Image
          unoptimized
          priority={true}
          src={img}
          alt={data.value}
          width={100}
          height={100}
          className="h-44 w-full rounded-xl"
        />
      </div>
      {/* right - detail */}
      <div className="flex w-fit flex-col gap-4 pt-4">
        {/* detail top */}
        <div className="flex w-auto flex-col gap-2">
          <div className="flex items-center justify-between pr-4">
            <span className="text-xl text-gray-500 flex items-center"> <MdBedroomParent className="text-4xl"/> {data.value}</span>
            <span className="text-xl text-gray-500">{data.roomType}</span>
          </div>
          <div className="flex ml-1">
            <span className="font-semibold flex items-center text-xl">
            <MdOutlineEventAvailable className="text-2xl"/>
              Beds Available - {+data.maxAdult - data.guests.length}
            </span>
          </div>
          <h3 className="flex text-sm pl-2">{data.remark}</h3>
        </div>

        {/* detail bottom */}

        <div className="order-first flex w-fit flex-col gap-2 sm:order-none pl-2">
          <div className="flex gap-2 items-center ">
          <SiLevelsdotfyi />
            <span className="font-semibold">{data.occupancy}</span>
            <span className="text-base text-gray-500">{data.floor}</span>
          </div>
          <div>
            <span className="flex items-center gap-2 text-sm font-semibold md:text-lg">
              <FaIndianRupeeSign /> {data.totalChargePerDay}/ night
            </span>
          </div>
          <Link
            hidden={!(+room.maxAdult - room.guests.length)}
            href={`/hostel/${room.id}?checkin=${checkIn}&checkout=${checkOut}&type=${xBookingType}`}
            className="flex"
          >
            <button className="w-fit rounded-xl bg-blue-500 p-2 px-4 text-white duration-300 hover:bg-blue-600 active:scale-90">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppPlaceCard;
