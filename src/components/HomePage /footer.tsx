import React from 'react';
import { FaFacebookF, FaGooglePlusG, FaInstagram, FaLocationDot, FaTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { PiFinnTheHumanFill } from 'react-icons/pi';
const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 w-full">
      <div className="container grid grid-cols-4 gap-8">
        <div className='flex flex-col justify-between'>
          <h2 className="text-xl font-bold">Hosteller</h2>
          <p className="mt-4 text-sm">
            Ut tellus elementum sagittis vitae et leo duis ut. Sit amet consectetur adipiscing elit duis. Ultrices gravida dictum fusce ut placerat orci nulla pellentesque.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold">Quick links</h2>
          <ul className="mt-4 flex flex-col gap-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Rooms</a></li>
            <li><a href="#" className="hover:underline">News</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">Contact Us</h2>
          <ul className="mt-4 gap-3 flex flex-col">
            <div className='flex gap-2 items-center'>
            <FaLocationDot />
            <span>
              54826 Fadel Circles <br/>
              Darrylstad, AZ 90995</span>
            </div>
            <div className='flex gap-2 items-center'>
            <FaPhone />
            <span>(329) 580-7077<br/>
            (650) 382-5020</span>
            </div>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold">Follow Us</h2>
          <p className="mt-4 text-sm">Venenatis urna cursus eget nunc scelerisque.</p>
          <div>
                        <div className="flex space-x-4 mt-2">
                            <button className="text-white hover:text-gray-300">
                                <FaFacebookF className='text-3xl' />
                            </button>
                            <button className="text-white hover:text-gray-300">
                                <FaTwitter className='text-3xl' />
                            </button>
                            <button className="text-white hover:text-gray-300">
                                <FaInstagram className='text-3xl' />
                            </button>
                            <button className="text-white hover:text-gray-300">
                                <FaGooglePlusG className='text-3xl' />
                            </button>
                        </div>
                    </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
