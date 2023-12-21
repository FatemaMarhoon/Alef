'use client'
import { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { createUser } from '@/services/userService';
import { useRouter } from 'next/navigation'
import ErrorAlert from "../ErrorAlert";
import { getStaff, updateStaff } from "@/services/staffService";
import { currentPreschool } from "@/services/authService";
import { useSuccessMessageContext } from "../SuccessMessageContext";
import { Staff } from "@/types/staff";


export default function CreateForm() {
  const router = useRouter();
  const { setSuccessMessage } = useSuccessMessageContext();
  const [email, setEmail] = useState("");
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [connectedStaff, setConnectedStaff] = useState<number>(0);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStaff() {
      const allStaff = await getStaff();
      const filteredStaff = allStaff.filter((staff) => !staff.user_id); //return only staff with no account 
      setStaffList(filteredStaff);
    }

    fetchStaff();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await currentPreschool().then(async (preschoolId) => {
        const response = await createUser(email, fullName, role, Number(preschoolId));
        if (response.status === 201 || response.status == 200) {
          //after succesful user creation, update staff
          const staffObject = staffList.find((staff) => staff.id == connectedStaff);
          if (staffObject) {
            staffObject.user_id = response.data.createdUser.id;
            await updateStaff(connectedStaff, staffObject);
          }
          setSuccessMessage(response.data.message);
          router.push('/users');
        }
        else if (response.status == 400 || response.status == 404 || response.status == 500) {
          setError(response.data.message);
        }
      });

    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      }
      else if (error.message) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      {error && <ErrorAlert message={error}></ErrorAlert>}
      <Breadcrumb pageName="Create User" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          { /* FORM STARTS HERE */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create User
              </h3>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter user's email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Full Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter user's full name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Role <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={role} // Bind the selected value to the state
                      onChange={(e) => setRole(e.target.value)}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Select user's role</option>
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="Teacher">Teacher</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    For Staff <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      value={connectedStaff}
                      onChange={(e) => setConnectedStaff(Number(e.target.value))}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Select Staff</option>
                      {staffList.map((staff, index) => (
                        <option key={index} value={staff.id}>
                          {staff.name + " - " + staff.staff_role_name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
