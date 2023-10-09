export interface ILoaderProps {
  color: string;
}

export interface IButtonProps {
  title: string;
  fullwidth?: boolean;
  rounded?: boolean;
  roundedBG?: boolean;
  purple?: boolean;
  silver?: boolean;
  white?: boolean;
  black?: boolean;
  buttonType: 'button' | 'submit' | 'reset';
  handleClick?: () => void;
  disabled?: boolean;
}

export interface IModalProps {
  title: string;
  children: React.ReactNode;
  setFooter?: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISVGProps {
  color: string;
}

export interface IDotSVGProps {
  status: string;
}

export interface IFormModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};
