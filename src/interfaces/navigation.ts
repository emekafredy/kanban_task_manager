export interface ISideBarProps {
  sideBarVisible: boolean;
  setSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMobileTopLeftNavProps {
  title: string
}

export interface ITopLeftNavProps {
  sideBarVisible: boolean | null;
  colorTheme: string;
  title: string
}
