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
  placeholder?: string;
  inputDisabled?: boolean;
  rmvBtnDisabled?: boolean;
}

export interface ISelectProps {
  formLabel: string;
  formTitle: string;
  optionsData: string[] | any[] | undefined;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  mode?: string;
  handleTaskStatusUpdate?: (change: string, status: string) => void;
}
