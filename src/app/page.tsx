"use client"
import SearchForm from "./_components/SearchForm";
import Image from "next/image";
import { CarouselPlugin } from "./_components/Caraousal/Caraousal";
import VipCard from "./_components/VipCard/VipCard";
import { Suspense } from "react";
import Link from "next/link";

export default function Home() {

  return (

    <main className="flex flex-col justify-center items-center gap-16">
      <section className="flex flex-col gap-2 justify-center items-center text-center">
        <div className="font-bold text-primary text-xl md:text-3xl">NATIONAL INSTITUTE OF</div>
        <div className="font-bold text-primary text-xl md:text-3xl"> TECHNICAL TEACHERS TRAINING AND RESEARCH, BHOPAL</div>
        <div className="text-sm text-wrap">Estd in 1965 by the Ministry of Education, Government of India, NITTTR, Bhopal stands as a distinguished Deemed University training teachers and enhancing the overall quality of the Technical Education System. Our commitment extends to the continual improvement of educational standards.</div>
      </section>
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-5xl text-black">Staying Options in NITTTR</h2>
      </section>
      <section className="m-4 mt-0 -mb-14 px-2 lg:px-4">
        <Suspense><SearchForm /></Suspense>
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
            <Link href={`/gallery?location=${item.location}`} key={item.id} className="space-y-1 col-span-3 md:col-span-1  cursor-pointer">
              <img
                width={100}
                height={100}
                key={item.id}
                className="w-80  h-72 object-cover rounded-lg pb-2"
                src={item.src}
                alt=""
              />

              <p className="font-bold">{item.title}</p>
              <p className="font-light text-sm">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <CarouselPlugin></CarouselPlugin>
      <section>
        <VipCard></VipCard>
      </section>
    </main >
  );
}
const Choices = [
  {
    id: 1,
    src: "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/_DSC0346+(2).JPG",
    title: "Saran Guest House",
    location: "saran",
    description: "",
  },
  {
    id: 2,
    src: "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/_DSC0140.JPG",
    title: "Vishveshvaraya Guest House",
    location: "vishveshvaraya",
    description: "",
  },
  {
    id: 3,
    src: "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1095.JPG",
    title: "Executive Guest House",
    location: "executive",
    description: "",
  },
];

