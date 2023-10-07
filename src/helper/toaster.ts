import { toast } from 'react-toastify';

export const renderErrorMessage = (error = 'An error occured. Please try again') => {
  toast.error(error);
};

export const renderSuccessMessage = (
  message: string
): void => {
  toast.success(message);
};
