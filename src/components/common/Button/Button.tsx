import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import styles from './Button.module.scss';

interface ButtonProps extends MuiButtonProps {
  className?: string;
}

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <MuiButton className={`${styles.button} ${className || ''}`} {...props}>
      {children}
    </MuiButton>
  );
};
