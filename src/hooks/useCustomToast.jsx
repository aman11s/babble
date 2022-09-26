import toast from "react-hot-toast";

const status = {
  fulfilled: "success",
  rejected: "error",
};

export const useCustomToast = () => {
  const customToast = (meta, payload) => {
    toast[status[meta.requestStatus]](payload.message);
  };

  return customToast;
};
