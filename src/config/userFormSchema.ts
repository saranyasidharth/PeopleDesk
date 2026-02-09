import type { FormFieldConfig } from '../types/form.types';

export const userFormSchema: FormFieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    placeholder: 'Enter first name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'First name must be between 2 and 50 characters'
    }
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    placeholder: 'Enter last name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
      message: 'Last name must be between 2 and 50 characters'
    }
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'Enter email address',
    validation: {
      required: true,
      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Please enter a valid email address'
    }
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'tel',
    required: true,
    placeholder: 'Enter phone number',
    validation: {
      required: true,
      pattern: /^[0-9]{10}$/,
      message: 'Phone number must be 10 digits'
    }
  }
];
