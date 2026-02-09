import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '../common/Button/Button';
import { Modal } from '../common/Modal/Modal';
import { Toast } from '../common/Toast/Toast';
import { ConfirmDialog } from '../common/ConfirmDialog/ConfirmDialog';
import { UserForm } from '../user/UserForm';
import { UserList } from '../user/UserList';
import { useUserContext } from '../../context/UserContext';
import type { User, UserFormData } from '../../types/user.types';
import styles from './Dashboard.module.scss';

interface ToastState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export const Dashboard = () => {
  const { users, addUser, updateUser, deleteUser, isLoading } = useUserContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleAddUser = async (data: UserFormData) => {
    try {
      await addUser(data);
      handleCloseModal();
      setToast({
        open: true,
        message: 'User added successfully!',
        severity: 'success'
      });
    } catch (error) {
      setToast({
        open: true,
        message: 'Failed to add user. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (editingUser) {
      try {
        await updateUser(editingUser.id, data);
        handleCloseModal();
        setToast({
          open: true,
          message: 'User updated successfully!',
          severity: 'success'
        });
      } catch (error) {
        setToast({
          open: true,
          message: 'Failed to update user. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id);
  };

  const handleConfirmDelete = async () => {
    if (deleteUserId) {
      try {
        await deleteUser(deleteUserId);
        setDeleteUserId(null);
        setToast({
          open: true,
          message: 'User deleted successfully!',
          severity: 'success'
        });
      } catch (error) {
        setToast({
          open: true,
          message: 'Failed to delete user. Please try again.',
          severity: 'error'
        });
      }
    }
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  return (
    <Box className={styles.dashboard}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" color='primary' component="div" sx={{ flexGrow: 1 }}>
            User Management Dashboard
          </Typography>
          
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" className={styles.container}>
        <Box className={styles.header}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Users
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage your user records
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
          >
            Add User
          </Button>
        </Box>

        <UserList
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
        />
      </Container>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <UserForm
          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
          initialData={editingUser ? {
            firstName: editingUser.firstName,
            lastName: editingUser.lastName,
            email: editingUser.email,
            phoneNumber: editingUser.phoneNumber
          } : undefined}
          isLoading={isLoading}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteUserId}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </Box>
  );
};
