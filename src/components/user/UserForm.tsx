import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../common/Input/Input';
import { Button } from '../common/Button/Button';
import { userFormSchema } from '../../config/userFormSchema';
import { userValidationSchema } from '../../config/validationSchema';
import type { UserFormData } from '../../types/user.types';
import styles from './UserForm.module.scss';

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  initialData?: UserFormData;
  isLoading?: boolean;
}

export const UserForm = ({ onSubmit, initialData, isLoading = false }: UserFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: yupResolver(userValidationSchema),
    mode: 'onBlur',
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    }
  });

  const handleFormSubmit = (data: UserFormData) => {
    onSubmit(data);
    if (!initialData) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form} noValidate>
      <div className={styles.formFields}>
        {userFormSchema.map((field) => (
          <Controller
            key={field.name}
            name={field.name as keyof UserFormData}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Input
                inputRef={ref}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                value={value || ''}
                onChange={onChange}
                onBlur={onBlur}
                error={!!errors[field.name as keyof UserFormData]}
                helperText={errors[field.name as keyof UserFormData]?.message}
                required={field.required}
                disabled={isLoading}
              />
            )}
          />
        ))}
      </div>
      <div className={styles.formActions}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? 'Saving...' : initialData ? 'Update User' : 'Add User'}
        </Button>
      </div>
    </form>
  );
};
