import { FC } from "react";

interface IAddSVGProps {
  color: string;
}

export const AddSVG:FC<IAddSVGProps> = ({
  color
}: IAddSVGProps) => {
  return (
    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
      />
    </svg>
  );
}