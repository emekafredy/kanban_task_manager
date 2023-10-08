export interface IInputProps {
  hasLabel?: boolean;
  formLabel?: string;
  formTitle: string;
  inputType?: string;
  placeholder?: string;
  register: any;
  value?: string | number;
  errors: any;
}

export interface IGroupInputProps {
  removeInput: (e: any) => void;
  value: string | number;
  handleChange: (e: any) => void;
  inputId: string;
}
