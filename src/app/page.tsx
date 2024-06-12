"use client"

import Accomodation from "~/components/HomePage /Accomodation";
import { CarouselPlugin } from "./_components/Caraousal/Caraousal";
import VipCard from "./_components/VipCard/VipCard";
import Link from "next/link";
import HeroSection from "~/components/HomePage /HeroSection";
import MapSection from "~/components/HomePage /MapSection";
import Footer from "~/components/HomePage /footer";
import PhotoModal from "~/components/HomePage /PhotoModal";
import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "~/utils/motion";

export default function Home() {


  return (

    <main className="flex flex-col justify-center items-center max-w-[1440px] mx-auto py-20 ">
      <motion.div
      initial="hidden"
      animate="visible"
      >
        <motion.section className="flex flex-col gap-2 justify-center items-center text-center"
        variants={slideInFromTop}
        >

          <div className="font-bold text-primary text-xl md:text-4xl">NATIONAL INSTITUTE OF</div>
          <div className="font-bold text-primary text-xl md:text-4xl"> TECHNICAL TEACHERS TRAINING AND RESEARCH, BHOPAL</div>
          <div className="text-sm sm:text-base md:text-xl">Estd in 1965 by the Ministry of Education, Government of India, NITTTR, Bhopal stands as a distinguished Deemed University training teachers and enhancing the overall quality of the Technical Education System. Our commitment extends to the continual improvement of educational standards.</div>
        </motion.section>

        <HeroSection images={Choices.map((choice) => choice.src)} />

        <PhotoModal />

        <Accomodation />

        <MapSection />
        <VipCard />
      </motion.div>
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

