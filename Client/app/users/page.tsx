'use client'
import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '@/services/userService';
import { User } from '@/types/user';
import Link from 'next/link';
import SuccessAlert from '@/components/SuccessAlert';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Icon,
  MenuItem,
  Tooltip,
  TableFooter
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TablePagination from '@mui/material/TablePagination';

import { useRouter, useSearchParams } from 'next/navigation';

export default function UsersTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [tempMessage, setTempMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchValue.toLowerCase()) &&
    (filterValue === "" || user.role_name === filterValue)
  );

  useEffect(() => {
    // Update the page state variable when the filteredUsers array changes
    setPage(0);
  }, [filteredUsers]);

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

  async function statusChange(id: number, status: string) {
    const newStatus = status === "Disabled" ? "Enabled" : "Disabled";
    const response = await updateUser({ id: id, status: newStatus });
    if (response) {
      router.refresh();
    }
  }

  async function handleDelete(id: number) {
    const response = await deleteUser(id);
    if (response) {
      router.refresh();
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };


  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filteredUsers.length - page * rowsPerPage);

  return (
    <>
      {tempMessage && <SuccessAlert message={tempMessage}></SuccessAlert>}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Users
          </h4>
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
              id="search"
              label="Search"
              value={searchValue}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="filter"
              select
              label="Filter"
              value={filterValue}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterListIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Parent">Parent</MenuItem>
            </TextField>
          </div>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Quick Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role_name}</TableCell>
                    <TableCell>
                      <span className={user.status === 'Enabled' ? 'text-meta-3' : 'text-danger'}>
                        {user.status}
                      </span>
                    </TableCell>
                    {/* <TableCell>
                      <span
                        className={`${user.status === 'Enabled' ? 'text-meta-3' : 'text-danger'}`}
                      >
                        {user.status}
                      </span>
                    </TableCell> */}
                    <TableCell>
                      <IconButton
                        onClick={() => statusChange(user.id, user.status)}
                        aria-label={`toggle ${user.status === 'Enabled' ? 'disable' : 'enable'}`}
                      >
                        {user.status === 'Enabled' ? (
                          <Tooltip title="Disable" arrow>
                            <Icon className="cursor-pointer text-primary">toggle_on</Icon>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Enable" arrow>
                            <Icon className="cursor-pointer text-primary">toggle_off</Icon>
                          </Tooltip>
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(user.id)}
                        aria-label="delete"
                      >

                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
  
            </Table>
          </TableContainer>
          {filteredUsers.length === 0 && (
            <div className="text-center text-gray-700 dark:text-gray-300 mt-4">
              No users found.
            </div>
          )}
        </div>
      </div>
    </>
  );
}