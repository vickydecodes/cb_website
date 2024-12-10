import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useApi } from "../context/ApiContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({children}) {
  const { userCredentials } = useApi();
  
  const {currentUser} = useAuth();

  const {proof_verified, email_verified, college_verified} = userCredentials;

  console.log('Private route validated')


  console.log({proof_verified, email_verified, college_verified, currentUser})

  if(college_verified != 'true'){
    toast.error('The College is till not verified. Please try again later.')
    return <Navigate to="/verify-admin" replace />
  }

  if(email_verified  != 'true'){
    toast.error('The email is not verified. You are not allowed to do this.')
    return <Navigate to="/verify-email" replace />
  }

  if(proof_verified != 'true'){
    toast.error('The college proofs are not verified. Please try again later.')
    return <Navigate to='/verify-admin' replace />
  }

  if(!currentUser){
    return <Navigate to="/login" replace />
  }

  if(currentUser && proof_verified && email_verified && college_verified){
    return children;
  }

}
