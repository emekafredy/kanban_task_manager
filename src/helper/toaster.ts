import { toast } from 'react-toastify';

export const renderErrorMessage = (error: Error) => {
  toast.error(error.message);
};

export const renderSuccessMessage = (
  message: string
): void => {
  toast.success(message);
};

export const renderInfoMessage = (
  message: string
): void => {
  toast.info(message);
};
