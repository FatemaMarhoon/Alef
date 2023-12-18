'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createRequest } from '@/services/requestService';
import { useRouter } from 'next/navigation'
import { User } from '@/types/user';
import { useSuccessMessageContext } from "../SuccessMessageContext";

export default function RequestForm({ planId }: { planId: number }) {
  const router = useRouter();
  const { successMessage, setSuccessMessage } = useSuccessMessageContext();
  const [preschool_name, setPreschoolName] = useState("");
  const [representitive_name, setRepName] = useState("");
  const [CR, setCR] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createRequest(preschool_name,representitive_name,CR,phone,email,planId);
      if (response) {
        console.log("request created successfully")
        setSuccessMessage("Request Submitted Successfully.")
        router.push('/plans');
      }
    } catch (error) {
      // Handle error
      console.error("Error creating request:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          { /* FORM STARTS HERE */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Request To Subscribe
              </h3>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Preschool Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={preschool_name}
                    onChange={(e) => setPreschoolName(e.target.value)}
                    placeholder="Enter full legal name for yor preschool."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    CR <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={CR}
                    onChange={(e) => setCR(e.target.value)}
                    placeholder="Enter your preschool's CR number."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Representative Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={representitive_name}
                    onChange={(e) => setRepName(e.target.value)}
                    placeholder="Enter legal representative full name."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter official email address."
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                    Contact Number <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter official contact number"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
