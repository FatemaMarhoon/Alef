import { useState } from 'react';
import { Disclosure, Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const navigation = [
  { name: 'About Us', href: '#' },
  { name: 'Products', href: '#' },
  { name: 'Packages', href: '/plans' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image
              width={88}
              height={16}
              src="/images/logo/Alef - bordered logo.png"
              alt="Logo"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href={"/login"} className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        {/* Mobile menu content */}
        <div className="p-4 space-y-4">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} passHref>
              <a className="block text-sm font-semibold text-gray-900">{item.name}</a>
            </Link>
          ))}
          <Link href="/login" passHref>
            <a className="block text-sm font-semibold text-gray-900">Log in &rarr;</a>
          </Link>
        </div>
      </Dialog>
    </header>
  );
}
