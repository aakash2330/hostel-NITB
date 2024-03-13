
import { RoomDetails } from '@prisma/client';
import Image, { StaticImageData } from 'next/image';
// icons

const AppPlaceCard = ({ data, img }: { data: RoomDetails, img: any }) => {
  return (
    <div className="grid sm:grid-cols-[300px,1fr] py-5 cursor-pointer grid-cols-1 gap-x-4">
      {/* left - image */}
      <div className="relative w-full mb-2 md:mb-0 sm:h-44 h-52 ">
        <img
          src={img}
          alt={data.value}
          width={100}
          height={100}
          className="w-full h-44 rounded-xl"
        />
      </div>
      {/* right - detail */}
      <div className="flex flex-col px-1 sm:px-0">
        {/* detail top */}
        <div className="flex-grow">
          <span className="text-sm text-gray-500">{data.value}</span>
          <h3 className="text-sm text-wrap truncate">{data.remark}</h3>
          <span className="text-sm text-gray-500">{data.roomType}</span>
        </div>

        {/* detail bottom */}
        <div className="flex justify-between order-first sm:order-none">
          <div className="flex items-center">
            <span className="mx-1 font-semibold">{data.occupancy}</span>
            <span className="text-xs text-gray-500">({data.floor})</span>
          </div>
          <div>
            <span className="mr-1 text-sm md:text-lg font-semibold">{data.totalChargePerDay}</span>
            <span className="font-light md:text-lg text-md">/ night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPlaceCard;
