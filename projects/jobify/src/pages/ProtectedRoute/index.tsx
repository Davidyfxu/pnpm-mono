import React from "react";
import { useAppContext } from "../../context/appContext";
import { Navigate } from "react-router-dom";
import { Loading } from "../../components";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, userLoading } = useAppContext();
  if (userLoading) return <Loading center />;
  if (!user) {
    return <Navigate to={"/landing"} />;
  }

  return children;
};

export default ProtectedRoute;
