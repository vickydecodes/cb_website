import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApi } from "../context/ApiContext";

export default function PrivateRoute({children}) {
  const { userCredentials } = useApi();

  const {proof_verified, email_verified, college_verified} = userCredentials;

  console.log({proof_verified, email_verified, college_verified})

  if(!proof_verified && !email_verified && !college_verified){
    return <Navigate to="/login" replace />
  }

  if(!proof_verified && !email_verified){
    return <Navigate to="/verify-email" replace />
  }

  if(!proof_verified){
    return <Navigate to='/verify-admin' replace />
  }

  console.log('Private route validated')

  return children;
}
