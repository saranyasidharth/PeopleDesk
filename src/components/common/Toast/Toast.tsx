import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import styles from './Toast.module.scss';

interface ToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast = ({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 3000
}: ToastProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      className={styles.toast}
    >
      <Alert onClose={onClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
