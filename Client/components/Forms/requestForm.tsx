'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createRequest } from '@/services/requestService';
import { useRouter } from 'next/navigation'
import { User } from '@/types/user';
import { useSuccessMessageContext } from "../SuccessMessageContext";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Switch } from '@headlessui/react';
import ErrorAlert from "../ErrorAlert";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function RequestForm({ planId }: { planId: number }) {
  const router = useRouter();
  const [preschool_name, setPreschoolName] = useState("");
  const [representitive_name, setRepName] = useState("");
  const [CR, setCR] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (agreed == true) {
        const response = await createRequest(preschool_name, representitive_name, CR, phone, email, planId);
        if (response.status == 200 || response.status == 201) {
          router.push('/plans');
        }
        else if (response.status == 404 || response.status == 400 || response.status == 500) {
          setError(response.data.message);
        }
      }
      else {
        setError("You must agree to the privacy policy.")
      }
    } catch (error: any) {
      // Handle error
      setError(error.message);
      console.error("Error creating request:", error);
    }
  };

  return (
    <>
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F1F7B5] to-[#9EA1D4] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Request to Join
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Submit your preschool details to subscribe and we'll review your request.
          </p>
        </div>

        <form
          action="#"
          onSubmit={handleSubmit}
          className="mx-auto mt-5 max-w-xl sm:mt-10"
        >
          {error && <div className="sm:col-span-2">
            <ErrorAlert message={error}></ErrorAlert>
          </div>
          }
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="preschool-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Preschool Name <span className="text-meta-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="preschool-name"
                  id="preschool-name"
                  value={preschool_name}
                  onChange={(e) => setPreschoolName(e.target.value)}
                  placeholder="Enter full legal name for your preschool."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-alef-purple placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="CR"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                CR <span className="text-meta-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="CR"
                  id="CR"
                  value={CR}
                  onChange={(e) => setCR(e.target.value)}
                  placeholder="Enter your preschool's CR number."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-alef-purple placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="representative-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Representative Name <span className="text-meta-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="representative-name"
                  id="representative-name"
                  value={representitive_name}
                  onChange={(e) => setRepName(e.target.value)}
                  placeholder="Enter legal representative full name."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-alef-purple placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email <span className="text-meta-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter official email address."
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-alef-purple placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Contact Number <span className="text-meta-1">*</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter official contact number"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-alef-purple placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <Switch.Group as="div" className="flex gap-x-4 items-center">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={classNames(
                      agreed ? 'bg-primary' : 'bg-gray-200',
                      'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                    )}
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        agreed ? 'translate-x-3.5' : 'translate-x-0',
                        'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                <Switch.Label className="text-sm leading-6 text-gray-600">
                  By selecting this, you agree to our{' '}
                  <a href="#" className="font-semibold text-primary">
                    privacy&nbsp;policy
                  </a>
                  .
                  <span className="text-meta-1"> *</span>
                </Switch.Label>
              </Switch.Group>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Request
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
