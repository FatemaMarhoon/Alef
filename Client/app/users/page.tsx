'use client'
import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '@/services/userService';
import { User } from '@/types/user';
import Link from 'next/link';
import SuccessAlert from '@/components/SuccessAlert';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { useRouter, useSearchParams } from 'next/navigation';

export default function UsersTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [tempMessage, setTempMessage] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
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
    const newStatus = status === 'Disabled' ? 'Enabled' : 'Disabled';
    const response = await updateUser({ id: id, status: newStatus });
    if (response) {
      router.refresh();
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

  return (
    <>
      {tempMessage && <SuccessAlert message={tempMessage}></SuccessAlert>}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">Users</h4>
          <Link
            href="users/create"
            className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Create User
          </Link>
        </div>
        <div className="flex flex-col">
          {/* Search & Filter */}
          <div className="flex justify-between items-center mb-4">
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
              className="mb-4"
            />
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel id="filter-label">Filter</InputLabel>
              <Select
                labelId="filter-label"
                id="filter"
                value={filterValue}
                onChange={handleFilterChange}
                label="Filter"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Parent">Parent</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Table */}
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark-bg-meta-4">
                  <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                    Name
                  </th>
                  <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                    Email
                  </th>
                  <th className="min-w-220px py-4 px-4 font-medium text-black dark-text-white xl-pl-11">
                    Role
                  </th>
                  <th className="min-w-150px py-4 px-4 font-medium text-black dark-text-white">
                    Status
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark-text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentUsers) &&
                  currentUsers.map((user, key) => (
                    <tr key={key}>
                      <td className="py-4 px-4 text-black dark-text-white">{user.name}</td>
                      <td className="py-4 px-4 text-black dark-text-white">{user.email}</td>
                      <td className="py-4 px-4 text-black dark-text-white">{user.role_name}</td>
                      <td className="py-4 px-4 text-black dark-text-white">
                        <span className={user.status === 'Enabled' ? 'text-meta-3' : 'text-danger'}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-black dark-text-white">
                        <button
                          onClick={() => statusChange(user.id, user.status)}
                          className="mr-2 text-primary hover:underline"
                        >
                          {user.status === 'Enabled' ? 'Disable' : 'Enable'}
                        </button>
                        <button 
                        // onClick={() => handleDelete(user.id)} 
                        className="text-danger hover:underline">
                          Delete
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
