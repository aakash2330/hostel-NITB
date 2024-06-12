import Image from 'next/image'
import React, { Suspense, useEffect, useState } from 'react'
import SearchForm from '~/app/_components/SearchForm'
import { Quote } from '../Assets';
import { motion } from "framer-motion";
import { slideInFromBottom, slideInFromLeft } from '~/utils/motion';

const HeroSection = ({ images }: any) => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    return (

        <>
            <motion.div className="sm:p-6 mt-10 md:mt-20"
            variants={slideInFromLeft(0.1)}
            >
                <h2 className="font-bold sm:text-3xl text-xl text-black underline ">Staying Options in NITTTR</h2>
            </motion.div>

            <motion.div className="flex flex-col justify-center items-center  w-full border-b border-gray-200 rounded-lg drop-shadow-lg decoration-gray-900"
             variants={slideInFromBottom(0.5)}
            >
                <div className="bg-white shadow-lg rounded-lg overflow-hidden  w-full">
                    <div className="flex flex-col md:flex-row items-end">
                        <div className="p-8 md:w-1/2 flex flex-col gap-2 relative pb-12 bg-blue-50">
                            <h1 className="text-4xl font-bold mb-4 ">Hosteller — amazing hostel for the free spirited traveler</h1>
                            <p className="text-gray-600 mb-8 border-l-2 border-black pl-2">
                                Egestas pretium aenean pharetra magna ac. Et tortor consequat id porta nibh venenatis cras sed. Vel turpis nunc eget lorem dolor sed.
                            </p>
                            <div className="z-10">
                                <Suspense><SearchForm /></Suspense>
                            </div>

                        </div>

                        <div className="relative w-1/2 h-fit sm:flex hidden">
                            <Image
                                src={images[currentImage] || '/default.jpg'}

                                objectFit="cover"
                                alt="Hostel room"
                                width={1200}
                                height={1200}
                                className='w-full h-[500px] object-cover shadow-slate-100 shadow-xl'
                            />
                            {/* <div className="text-center p-4">
                        {images.map((_: any, index: any) => (
                            <span key={index} className={`mx-1 ${currentImage === index ? 'text-blue-600' : 'text-gray-400'}`}>
                                •
                            </span>
                        ))}
                    </div> */}
                        </div>
                        <Image
                            src={Quote}
                            alt="Company Benefits"
                            width={500}
                            height={500}
                            className="w-1/4 h-1/2 absolute top-0 opacity-5 z-0 sm:flex hidden"
                        />
                    </div>

                </div>
            </motion.div>

        </>
    )
}

export default HeroSection