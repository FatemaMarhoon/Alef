import { useState } from 'react';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Alef</span>
            <Image
              width={88}
              height={16}
              src="/images/logo/Alef - bordered logo.png"
              alt="Logo"
            />
          </a>
        </div>
        
        <div className="flex flex-1 justify-end">
          <Link prefetch={false} href={"/login"} className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      
    </header>
  );
}
