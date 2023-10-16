export interface ILoaderProps {
  color: string;
}

export interface IButtonProps {
  title: string | React.ReactNode;
  fullwidth?: boolean;
  rounded?: boolean;
  roundedBG?: boolean;
  primary?: boolean;
  secondary?: boolean;
  destructive?: boolean;
  buttonType: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
  disabled?: boolean;
  large?: boolean;
  small?: boolean;
  extraClasses?: string;
  hasIcon?: boolean;
  leftIcon?: React.ReactNode;
  mobileFullwidth?: boolean;
}

export interface IModalProps {
  title: string;
  children: React.ReactNode;
  setFooter?: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeBTN?: boolean;
  actionTerm?: string;
  performAction?: () => void;
  actionBtnLoading?: boolean;
  showMenuOptions?: boolean;
  setShowMenuOptions?: React.Dispatch<React.SetStateAction<boolean>>;
  menuOptions?: React.ReactNode;
}

export interface ISVGProps {
  color: string;
}

export interface IDotSVGProps {
  status: string;
}

export interface IFormModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  mode?: string;
};

export interface IConfirmDeleteModalProps {
  title: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  bodyText: string;
  handleDelete: () => void;
  actionBtnLoading: boolean;
}

export interface IOptionsMenuProps {
  editText: string;
  deleteText: string;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPrevModal: React.Dispatch<React.SetStateAction<boolean>>;
  board?: boolean;
  task?: boolean;
  setShowTaskDetailsModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
