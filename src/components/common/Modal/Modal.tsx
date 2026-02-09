import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.scss';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({ open, onClose, title, children, actions, maxWidth = 'sm' }: ModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      className={styles.modal}
    >
      <DialogTitle className={styles.modalTitle} m={1}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          className={styles.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.modalContent} >
        {children}
      </DialogContent>
      {actions && (
        <DialogActions className={styles.modalActions}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
};
