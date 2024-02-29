'use client';
import { Fragment, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button } from '~/components/ui/button';
import AccountDropdown from '../account-dropdown';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full">
      {/* <NavbarAnnouncement />
      <NavbarTop />
      <NavbarBottom /> */}
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="">
        <nav
          aria-label="Top"
          className="mx-auto   px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center lg:hidden">
              </div>
              <div className='md:text-2xl mx-2 font-bold cursor-pointer' onClick={() => { window.location.href = "/" }}>LOGO</div>
              {/* Flyout menus */}
              <div className="flex justify-center w-full  items-center h-full gap-5 sm:gap-[15%]">
                {NavBarData.pages.map((page) => (
                  <a
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </a>
                ))}
              </div>
              <Button className='rounded-3xl mx-2  sm:w-[20%]'>Contact Us</Button>
              <AccountDropdown ></AccountDropdown>
            </div>
          </div>
        </nav>
      </header>
    </nav>
  );
};
export default Navbar;


export const NavBarData = {
  pages: [
    { name: 'Institute', href: '/test' },
    { name: 'Faculty', href: '/test' },
    { name: 'Gallery', href: '/test' },
    { name: 'Accomodations', href: '/test' },
  ],
};
