import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../features/hooks";

const ToastMessage: React.FC = () => {
  const { toastMessage } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const { message, status } = toastMessage;
    if (message !== "" && status !== "") {
      const toastFn = toast[status as keyof typeof toast];
      if (typeof toastFn === "function") {
        (toastFn as (msg: string, opts?: object) => void)(message, {
          theme: "colored",
        });
      }
    }
  }, [toastMessage]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default ToastMessage;
