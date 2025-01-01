import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loading from "../pages/components/Loading/Loading";

export default function PrivateRoute() {
  const { userCredentials, fetchUserData } = useApi();
  const { currentUser } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!userCredentials && currentUser) {
      fetchUserData(currentUser.uid);
    }
  }, [userCredentials, currentUser, fetchUserData]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!userCredentials) {
    return <Loading />;
  }

  const { proof_verified, email_verified, college_verified } = userCredentials || {email_verified: 'false' ,proof_verified: 'false', college_verified: 'false'};
  const VERIFIED = "true";

  // Verification Logic
  if (email_verified !== VERIFIED) {
    return location.pathname !== "/verify-email" ? (
      <Navigate to="/verify-email" replace />
    ) : (
      <Loading />
    );
  }

  if (proof_verified !== VERIFIED) {
    return location.pathname !== "/verify-admin" ? (
      <Navigate to="/verify-admin" replace />
    ) : (
      <Loading />
    );
  }

  if (college_verified !== VERIFIED) {
    return location.pathname !== "/create-user" ? (
      <Navigate to="/create-user" replace />
    ) : (
      <Loading />
    );
  }

  const isVerifiedPath =
    ["/verify-email", "/verify-admin", "/create-user"].includes(location.pathname);
  if (isVerifiedPath) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
