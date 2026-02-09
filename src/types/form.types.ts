export type FieldType = 'text' | 'email' | 'tel' | 'date' | 'select';

export interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  message?: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  validation?: ValidationRule;
  options?: { value: string; label: string }[];
}

export interface FormSchema {
  fields: FormFieldConfig[];
}
