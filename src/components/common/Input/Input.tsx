import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import styles from './Input.module.scss';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  className?: string;
}

export const Input = ({ className, type, ...props }: InputProps) => {
  const inputProps = type === 'tel' ? {
    inputMode: 'numeric' as const,
    pattern: '[0-9]*'
  } : {};

  return (
    <TextField
      className={`${styles.input} ${className || ''}`}
      variant="outlined"
      fullWidth
      type={type}
      inputProps={inputProps}
      {...props}
    />
  );
};
