'use client'
import { CheckIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from "react";
import { Plan } from "../../types/plan"
import { getPlans } from "../../services/planService"
import Link from "next/link";

const features1 = [
  'Application Management',
  'Parents Communications',
  'Appointments Booking',
  'App Profile',
]

const features2 = [
  'Application Management',
  'Parents Communications',
  'Appointments & Events',
  'Staff & Student Management',
]

const features3 = [
  'Application Management',
  'Class Managemnet',
  'Staff & Student Management',
  'Payment Tracking',
]

export default function Package() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const usersData = await getPlans();
        setPlans(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    fetchPlans();
  }, []);

  return (
    <>
      {loading &&
        <div className="flex h-screen items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>}
      {!loading && (
        <div className=" py-24 sm:py-32 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <>
                <div
                  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F1F7B5] to-[#9EA1D4] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                  />
                </div>
              </>
              <>
                <div
                  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#F1F7B5] to-[#9EA1D4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                  />
                </div>
              </>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Package For Everyone!</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Elevate your experience with our diverse subscription packages tailored to meet your needs.
              </p>
            </div>
            {plans.map((plan, index) => (

              <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-alef-purple ring-opacity-60 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">{plan.plan_name}</h3>
                  <p className="mt-6 text-base leading-7 text-gray-600">
                    {plan.plan_description}
                  </p>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-primary">What’s included</h4>
                    <div className="h-px flex-auto bg-alef-purple bg-opacity-20" />
                  </div>
                  <ul
                    role="list"
                    className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                  >
                    {index == 0 && (
                      <>
                        {features1.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </>
                    )}

                    {index == 1 && (
                      <>
                        {features2.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </>
                    )}


                    {index == 2 && (
                      <>
                        {features3.map((feature) => (
                          <li key={feature} className="flex gap-x-3">
                            <CheckIcon className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </>
                    )}
                  </ul>
                </div>

                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div className="rounded-2xl bg-alef-purple bg-opacity-10 py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="text-base font-semibold text-gray-600">Annual Subscription</p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">{plan.monthly_price}</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">BHD</span>
                      </p>
                      <Link prefetch={false}
                        href={`/plans/request/${plan.id}`}
                        className="mt-10 block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Subscribe
                      </Link>
                      <p className="mt-6 text-xs leading-5 text-gray-600">
                        Invoices and receipts available for easy company reimbursement
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            ))}
            <>
              <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#F1F7B5] to-[#9EA1D4] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
            </>
            <>
              <div
                className="absolute inset-x-0 top-[calc(50%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                <div
                  className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F1F7B5] to-[#9EA1D4] opacity-40 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                  style={{
                    clipPath:
                      'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                  }}
                />
              </div>
            </>
          </div>
        </div>
      )}
    </>
  )
}
