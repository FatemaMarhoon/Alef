'use client'
import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser, getAllUsers } from '@/services/userService';
import { User } from '@/types/user';
import Link from 'next/link';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import SuccessAlert from '@/components/SuccessAlert';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Loader from "@/components/common/Loader";
import Select from '@mui/material/Select';
import { useRouter, useSearchParams } from 'next/navigation';
import { Delete, Edit } from '@mui/icons-material';
import { EyeIcon } from '@heroicons/react/20/solid';
import { currentUserRole } from "@/services/authService";
import ErrorAlert from '@/components/ErrorAlert';

export default function UsersTable() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [allusers, setAllUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { successMessage, setSuccessMessage } = useSuccessMessageContext();

  const [users, setUsers] = useState<User[]>([]);
  // search & pagination 
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [role, setRole] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {

        const userRole = await currentUserRole();
        setRole(String(userRole));
        console.log("role", role);


      } catch (error) {
        console.error("Error fetching :", error);

      }
    };

    fetchData(); // Call the async function

  }, [role]);
  useEffect(() => {

    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      let usersData;

      if (role === 'Super Admin') {
        // Fetch all users if the role is 'Super admin'
        usersData = await getAllUsers();
      } else {
        // Fetch regular users based on the current role
        usersData = await getUsers();
      }

      setUsers(usersData);
      setLoading(false); // Set loading to false once data is fetched

    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }


  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (filterValue === '' || user.role_name === filterValue)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event: any, value: React.SetStateAction<number>) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setFilterValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing filter
  }

  const statusChange = async (id: number, name: string, status: string) => {
    try {
      const newStatus = status === 'Disabled' ? 'Enabled' : 'Disabled';
      const message = newStatus == 'Enabled' ? `Are you sure that you want to enable ${name}'s user ?`
        : `Are you sure you want to disable ${name}'s user ? User will be prevented from loging-in.`
      if (confirm(message)) {
        const response = await updateUser({ id: id, status: newStatus });
        if (response.status == 200 || response.status == 201) {
          setSuccessMessage(`User ${newStatus} Successfully.`)
          fetchUsers();
        }
        else if (response.status == 400 || response.status == 404 || response.status == 500) {
          setError(response.data.message);
        }
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      }
      else if (error.message) {
        setError(error.message);
      }
    }
  };


  const handleDelete = async (id: number, name: string) => {
    try {
      if (confirm(`Are you sure you want to delete ${name}'s user permanently? This action cannot be reverted. `)) {
        const response = await deleteUser(id);
        if (response.status == 200 || response.status == 201) {
          setSuccessMessage(response.data.message);
          fetchUsers();
        }
        else if (response.status == 400 || response.status == 404 || response.status == 500) {
          setError(response.data.message);
        }
      }
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      }
      else if (error.message) {
        setError(error.message);
      }
    }
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <>
          {successMessage && <SuccessAlert message={successMessage}></SuccessAlert>}
          {error && <ErrorAlert message={error}></ErrorAlert>}
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
            <h4 className="text-xl font-semibold text-black dark:text-white">Users</h4>
            <div className="flex justify-end mb-4">
              <Link
                href="users/create"
                className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-opacity-90">
                Create User
              </Link>
            </div>
            <div className="flex flex-col dark:text-white dark:bg-boxdark">
              <div className="flex justify-between mb-4">
                <TextField
                  label="Search by Name"
                  variant="outlined"
                  size="small"

                  value={searchValue}
                  onChange={(e) => {
                    handleSearchChange(e)
                    setCurrentPage(1);
                  }}
                  style={{ width: '69%' }}
                />
                <FormControl variant="outlined" size="small" style={{ width: '29%' }}>
                  <InputLabel id="filter-label" className='dark:text-white'>Role</InputLabel>
                  <Select
                    labelId="filter-label"
                    id="filter"
                    value={filterValue}
                    onChange={handleFilterChange}
                    label="Filter"
                    className='dark:text-white dark:bg-boxdark'
                  >
                    <MenuItem value="" className={`dark:text-white dark:bg-boxdark dark:hover:text-black ${filterValue == '' ? 'dark:text-black' : ''}`}>All</MenuItem>
                    <MenuItem value="Admin" className={`dark:text-white dark:bg-boxdark dark:hover:text-black ${filterValue == 'Admin' ? 'dark:text-black' : ''}`}>Admin</MenuItem>
                    <MenuItem value="Staff" className={`dark:text-white dark:bg-boxdark dark:hover:text-black ${filterValue == 'Staff' ? 'dark:text-black' : ''}`}>Staff</MenuItem>
                    <MenuItem value="Teacher" className={`dark:text-white dark:bg-boxdark dark:hover:text-black ${filterValue == 'Teacher' ? 'dark:text-black' : ''}`}>Teacher</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {/* Table */}
              <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="min-w-150px py-4 px-4 font-medium text-black dark:text-white">
                        ID
                      </th>
                      <th className="min-w-150px py-4 px-4 font-medium text-black dark:text-white">
                        Name
                      </th>
                      <th className="min-w-220px py-4 px-4 font-medium text-black dark:text-white xl-pl-11">
                        Email
                      </th>
                      <th className="min-w-220px py-4 px-4 font-medium text-black dark:text-white xl-pl-11">
                        Role
                      </th>
                      <th className="min-w-150px py-4 px-4 font-medium text-black dark:text-white">
                        Status
                      </th>
                      <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(currentUsers) &&
                      currentUsers.map((user, key) => (
                        <tr key={key}>
                          <td className="py-4 px-4 text-black dark:text-white">{user.id}</td>
                          <td className="py-4 px-4 text-black dark:text-white">{user.name}</td>
                          <td className="py-4 px-4 text-black dark:text-white">{user.email}</td>
                          <td className="py-4 px-4 text-black dark:text-white">{user.role_name}</td>
                          <td className="py-4 px-4 text-black dark:text-white">
                            <span className={user.status === 'Enabled' ? 'text-meta-3' : 'text-danger'}>
                              {user.status}
                            </span>

                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center">
                            <div className="flex items-center space-x-3.5">
                              <button
                                className="hover:text-primary"
                                onClick={() => statusChange(user.id, user.name, user.status)}> {user.status == "Enabled" ? "Disable" : "Enable"}
                              </button>
                              <p> |</p>
                              <button
                                className="hover:text-primary">
                                <Link href={`/users/edit/${user.id}`}>
                                  Edit
                                </Link>
                              </button>
                              <p> |</p>

                              <button
                                onClick={() => handleDelete(user.id, user.name)}
                                className="hover:text-primary">
                                Delete
                              </button>
                            </div>

                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
                  No users found.
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-end mt-4">
                <Pagination
                  count={Math.ceil(filteredUsers.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}
                  size="small"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
