import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaGooglePlusG } from 'react-icons/fa';
import { RiContactsBook2Fill } from "react-icons/ri";
import { IoMdMail } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";
import { PiFinnTheHumanFill } from "react-icons/pi";

const MapSection = () => {
    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-8 flex flex-col justify-center items-center">
                <h2 className="text-5xl font-bold w-full flex items-center justify-center">We Are Available<br /> For You 24/7</h2>
                <p className=" uppercase font-medium text-xl">Our online support service is always 24 hours</p>
            </div>
            <div className="flex  w-full items-center justify-start">
                <div className="w-2/3 px-4 mb-8">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52281.827653121014!2d80.95261910814101!3d26.798550626188117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfdcd8d8fa887%3A0xdfe07da9196ea0af!2sAishbagh%20Junction!5e0!3m2!1sen!2sin!4v1717928848174!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        className='rounded-lg'
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 grid grid-cols-2 gap-5">
                    <div className="mb-4">
                        <div className='flex gap-1 items-center'>
                            <RiContactsBook2Fill className='text-3xl' />
                            <h3 className="text-2xl font-bold">Address</h3>
                        </div>
                        <p>yourmail@domain.com <br /> houserent@domain.com</p>
                    </div>
                    <div className="mb-4">
                        <div className='flex gap-1 items-center'>
                            <IoMdMail className='text-3xl' />
                            <h3 className="text-2xl font-bold">Mail</h3>
                        </div>
                        <p>+99 0215469875 <br />
                            666 35874692050</p>
                    </div>
                    <div className="mb-4">
                        <div className='flex gap-1 items-center'>
                            <BiSolidPhoneCall className='text-3xl' />
                            <h3 className="text-2xl font-bold">Call</h3>
                        </div>
                        <p>112/B - Road 121, King/St Melbourne Australia</p>
                    </div>
                    <div>
                        <div className='flex gap-1 items-center w-full'>
                            <PiFinnTheHumanFill className='text-3xl' />
                            <h3 className="text-2xl font-bold w-full">Social account</h3>
                        </div>
                        <div className="flex space-x-4 mt-2">
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaFacebookF className='text-3xl' />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaTwitter className='text-3xl' />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaInstagram className='text-3xl' />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <FaGooglePlusG className='text-3xl' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapSection;
