"use client"
import SearchForm from "./_components/SearchForm";
import img1 from "public/IMG_5599.png"
import img2 from "public/IMG_5622.png"
import img3 from "public/IMG_5624.png"
import Image from "next/image";
import { CarouselPlugin } from "./_components/Caraousal/Caraousal";
import VipCard from "./_components/VipCard/VipCard";

export default function Home() {

  return (

    <main className="flex flex-col justify-center items-center gap-16">
      <section className="flex flex-col gap-2 justify-center items-center text-center">
        <div className="font-bold text-primary text-3xl">NATIONAL INSTITUTE OF</div>
        <div> TECHNICAL TEACHERS' TRAINING AND RESEARCH, BHOPAL</div>
        <div className="text-sm text-wrap">National Institute of Technical Teachers' Training and Research, Bhopal is a unique premier institution, established in 1965 by Ministry of Education, Government of India for teacher training and improving quality of entire gamut of Technical Education System.</div>
      </section>
      <section>
        <CarouselPlugin></CarouselPlugin>
      </section>
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-5xl text-black">Find your Stay in NIIITR</h2>
        <h3 className="text-black py-5 text-xl">
          Low prices on hostels and accomodations . . .
        </h3>
      </section>
      <section className="m-4 mt-0 -mb-14 px-2 lg:px-4">
        <SearchForm />
      </section>

      <section className="mx-auto max-w-7xl mt-10 p-6 bg-white rounded-t-lg">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Our Top Hostels</h3>
          <p className="font-light">
            Popular Choices
          </p>
        </div>

        <div className="grid grid-cols-3 justify-center space-x-4 py-5 overflow-x-auto">
          {Choices.map((item) => (
            <div key={item.id} className="space-y-1 col-span-3 md:col-span-1  cursor-pointer">
              <Image
                width={400}
                height={400}
                key={item.id}
                className="w-80  h-72 object-cover rounded-lg pb-2"
                src={item.src}
                alt=""
              />

              <p className="font-bold">{item.title}</p>
              <p className="">{item.location}</p>
              <p className="font-light text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <VipCard></VipCard>
      </section>
    </main >
  );
}
const Choices = [
  {
    id: 1,
    src: img1,
    title: "Saran Guest House",
    location: "",
    description: "",
  },
  {
    id: 2,
    src: img2,
    title: "Vishveshvaraya Guest House",
    location: "",
    description: "",
  },
  {
    id: 3,
    src: img3,
    title: "Chandrakant Hostel",
    location: "",
    description: "",
  },
];

