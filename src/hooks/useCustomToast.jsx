import toast from "react-hot-toast";

const status = {
  fulfilled: "success",
  rejected: "error",
};

export const useCustomToast = () => {
  const customToast = (requestStatus, message) => {
    toast[status[requestStatus]](message);
  };

  return customToast;
};
