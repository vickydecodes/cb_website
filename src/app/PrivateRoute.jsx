import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import Loading from "../pages/components/Loading/Loading";

export default function PrivateRoute() {
  const { userCredentials, fetchUserData } = useApi();
  const { currentUser } = useAuth();

  const { proof_verified, email_verified, college_verified } =
    userCredentials || {};

  console.log({ proof_verified, email_verified, college_verified });

  console.log(currentUser);

  if (!userCredentials) {
    fetchUserData(currentUser.uid);
    return <Loading />;
  } else if (!currentUser) {
    return <Navigate to="/login" replace />;
  } else if (email_verified != "true") {
    toast.error(
      "Your email is not verified. Please verify your email to continue."
    );
    return <Navigate to="/verify-email" replace />;
  } else if (proof_verified != "true" && email_verified == "true") {
    toast.error(
      "Your college proofs are not verified. Please try again later."
    );
    return <Navigate to="/verify-admin" replace />;
  } else if (
    college_verified != "true" &&
    proof_verified === "true" &&
    email_verified === "true"
  ) {
    toast.error(
      "Your college verification is pending. Please try again later."
    );
    return <Navigate to="/create-user" replace />;
  }else{
    return <Outlet />;
  }

}
