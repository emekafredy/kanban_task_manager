import { FC } from "react";
import { IDotSVGProps } from "../../../interfaces/common";

export const DotSVG:FC<IDotSVGProps> = ({
  status
}) => {

  const setDotColor = () => {
    if (status.toLowerCase() === 'todo') {
      return 'fill-teal'
    } else if (status.toLowerCase() === 'doing') {
      return 'fill-purple-200'
    } else if (status.toLowerCase() === 'done') {
      return 'fill-green'
    } else {
      return 'fill-purple-100'
    }
  }
  return (
    <svg width="12" height="12" viewBox="0 0 15 15" fill="none"
      className={`${setDotColor()} mr-2`} xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="7.5" r="7.5"/>
    </svg>
  );
}
