'use client'
import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '@/services/userService';
import { User } from '@/types/user';
import Link from 'next/link';
import { useSuccessMessageContext } from '@/components/SuccessMessageContext';
import SuccessAlert from '@/components/SuccessAlert';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Loader from "@/components/common/Loader"; // Import the Loader component
import Select from '@mui/material/Select';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UsersTable() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { successMessage, setSuccessMessage } = useSuccessMessageContext();
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  async function fetchUsers() {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
      setLoading(false); // Set loading to false once data is fetched

    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }
  useEffect(() => {
  
    fetchUsers();
  }, []);

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

  const statusChange = async (id: number, status: string) => {
    try {
      const newStatus = status === 'Disabled' ? 'Enabled' : 'Disabled';
      const response = await updateUser({ id: id, status: newStatus });
      if (response.status == 200 || response.status == 201) {
        setSuccessMessage(`User ${newStatus} Successfully.`)
        fetchUsers();
      }
      else if (response.status == 400 || response.status == 404 || response.status == 500) {
        setError(response.data.message);
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

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleFilterChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setFilterValue(event.target.value);
    setCurrentPage(1); // Reset to the first page when changing filter
  };

  const handleDelete = async (id: number) => {
    try {
      if (confirm("Are you sure you want to delete user permanently? ")) {
        const response = await deleteUser(id);
        if (response.status == 200 || response.status == 201) {
          setSuccessMessage(response.data.message);
          router.push('/users');
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
      {successMessage && <SuccessAlert message={successMessage}></SuccessAlert>}
      {loading && <Loader />}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark dark:text-white sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">Users</h4>
          <Link
            href="users/create"
            className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Create User
          </Link>
        </div>
        <div className="flex flex-col dark:text-white dark:bg-boxdark">
          {/* Search & Filter */}
          {/* <div className="flex justify-between items-center mb-4 dark:text-white dark:bg-boxdark">
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
              className="mb-4 dark:text-white dark:bg-boxdark"
            /> */}
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
                                style={{ width: '60%' }}
                            />
            <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
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
                <MenuItem value="Parent" className={`dark:text-white dark:bg-boxdark dark:hover:text-black ${filterValue == 'Parent' ? 'dark:text-black' : ''}`}>Parent</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Table */}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentUsers) &&
                  currentUsers.map((user, key) => (
                    <tr key={key}>
                      <td className="py-4 px-4 text-black dark:text-white">{user.name}</td>
                      <td className="py-4 px-4 text-black dark:text-white">{user.email}</td>
                      <td className="py-4 px-4 text-black dark:text-white">{user.role_name}</td>
                      <td className="py-4 px-4 text-black dark:text-white">
                        <span className={user.status === 'Enabled' ? 'text-meta-3' : 'text-danger'}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-black dark:text-white">
                        <button
                          onClick={() => statusChange(user.id, user.status)}
                          className="mr-2 text-primary hover:underline"
                        >
                          {user.status === 'Enabled' ? 'Disable' : 'Enable'}
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className=" py-4 px-4 text-danger hover:underline">
                          Delete
                        </button>
                        <button
                          className=" py-4 px-4 text-primary hover:underline">
                          <Link href={`/users/edit/${user.id}`}>
                            Edit
                          </Link>
                        </button>
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
  );
}
