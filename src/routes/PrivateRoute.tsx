import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../features/hooks";

interface PrivateRouteProps {
  permissionLevel: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ permissionLevel }) => {
  const user = useAppSelector((state) => state.user.user);
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === "admin";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
