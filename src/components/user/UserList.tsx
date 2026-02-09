import { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Pagination,
  Typography,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import type { User } from '../../types/user.types';
import { UserTable } from './UserTable';
import styles from './UserList.module.scss';

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 5;

export const UserList = ({ users, onEdit, onDelete, isLoading = false }: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.phoneNumber.includes(query)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Box className={styles.userList}>
      <Box className={styles.searchContainer}>
        <TextField
          fullWidth
          placeholder="Search users by name, email, or phone..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          size="small"
        />
      </Box>

      <UserTable
        users={paginatedUsers}
        onEdit={onEdit}
        onDelete={onDelete}
        isLoading={isLoading}
        hasSearchQuery={searchQuery.length > 0}
      />

      {filteredUsers.length > ITEMS_PER_PAGE && (
        <Stack spacing={2} className={styles.paginationContainer}>
          <Typography variant="body2" color="text.secondary">
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} users
          </Typography>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
      )}
    </Box>
  );
};
