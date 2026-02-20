import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import Sidebar from "../components/layout/Sidebar";
import ToastMessage from "../components/layout/ToastMessage";
import Header from "../components/layout/Header";
import { loginWithToken } from "../features/user/userSlice";
import { getCartQty } from "../features/cart/cartSlice";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(loginWithToken());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getCartQty());
    }
  }, [user, dispatch]);

  const isAdmin = location.pathname.includes("admin");

  return (
    <div>
      <ToastMessage />
      {isAdmin ? (
        <div className="w-full flex flex-col md:flex-row min-h-screen shadow-[inset_0_0_30px_var(--y2k-purple)]">
          <div className="flex-shrink-0">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      ) : (
        <div className="w-full flex flex-col min-h-screen shadow-[inset_0_0_30px_var(--y2k-purple)]">
          <div className="w-full max-w-[1500px] mx-auto">
            <Header user={user} />
            <main className="w-full p-4 flex-1 flex justify-center">
              {children}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
