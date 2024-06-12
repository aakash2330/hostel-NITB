import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import TiltComponent from '~/app/_components/tiltComponent';
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { slideInFromLeft } from '~/utils/motion';

const saranRoomPictures = [
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/_DSC0346+(2).JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0127.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0136.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0137.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/DSC_0140.JPG",
];

const executeRoomPictures = [
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1095.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1107.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1115.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1120.JPG",
];

const viswesawraiyaguesthousePictures = [
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0067.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0067.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_0111.JPG",
  "https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/DSC_1422.JPG",
];

const Choices = [
  {
    id: 1,
    src: 'https://aakash2330-drippy.s3.amazonaws.com/NITTTR/saran/fwdsaranguesthouselatestphotograph/_DSC0346+(2).JPG',
    title: 'Saran Guest House',
    location: 'saran',
    images: saranRoomPictures,
  },
  {
    id: 2,
    src: 'https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdviswesawraiyaguesthouse/_DSC0140.JPG',
    title: 'Vishveshvaraya Guest House',
    location: 'vishveshvaraya',
    images: viswesawraiyaguesthousePictures,
  },
  {
    id: 3,
    src: 'https://aakash2330-drippy.s3.amazonaws.com/NITTTR/fwdexecutivehostelphotograph/DSC_1095.JPG',
    title: 'Executive Guest House',
    location: 'executive',
    images: executeRoomPictures,
  },
];

const PhotoModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenModal = (title: any, images: any) => {
    setSelectedImages(images);
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImages([]);
    setModalTitle('');
  };

  useEffect(() => {
    if (modalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [modalOpen]);

  return (
    <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      visible: { opacity: 1, scale: 1 },
      hidden: { opacity: 0, scale: 0 },
    }}
    >
      <motion.section className="mx-auto mt-10 p-6 bg-white rounded-t-lg w-full"
      variants={slideInFromLeft(0.5)}
      >
        <div className="pt-5 flex items-center flex-col justify-center">
          <h3 className="text-3xl font-bold">Our Top Hostels</h3>
          <p className="font-light text-2xl">Popular Choices</p>
        </div>

        <div className="grid grid-cols-3 justify-center space-x-4 py-5 overflow-x-auto">
          {Choices.map((item) => (
            <div
              key={item.id}
              className="space-y-1 col-span-3 md:col-span-1 cursor-pointer"
              onClick={() => handleOpenModal(item.title, item.images)}
            >
              <img
                width={500}
                height={500}
                key={item.id}
                className="w-full h-80 object-cover rounded-lg"
                src={item.src}
                alt=""
              />
              <p className="font-bold">{item.title}</p>
              <p className="font-light text-sm">{item.location}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-7xl w-full pb-20 flex flex-col items-center justify-start"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-3xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">{modalTitle}</h2>
            <div className="grid h-full w-full grid-cols-1 items-center justify-center gap-5 md:grid-cols-4">
              {selectedImages.slice(0, 8).map((img, index) => (
                <TiltComponent key={img + index} img={img} />
              ))}
             <Link href= "/gallery">
             <span className="w-full flex justify-center items-center absolute bottom-5 left-[45%]">
                <FaArrowRight />
                View All</span>
             </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoModal;
