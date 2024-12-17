import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/Register/Register.jsx";
import VerifyE from "../pages/VerifyE/VerifyE.jsx";
import VerifyA from "../pages/VerifyA/VerifyA.jsx";
import Login from "../pages/Login/Login.jsx";
import CreateProfile from "../pages/CreateProfile/CreateProfile.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import CreatePost from "../pages/CreatePost/CreatePost.jsx";
import EditPost from "../pages/EditPost/EditPost.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx"; // Create a 404 page
import { ApiProvider } from "../context/ApiContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import Welcome from "../pages/components/Welcome/Welcome.jsx";
import { StateProvider } from "../context/StateContext.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <StateProvider>
        <ApiProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyE />} />
            <Route path="/verify-admin" element={<VerifyA />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/create-user" element={<CreateProfile />} />

            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
            </Route>

            {/* Fallback for Undefined Routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ApiProvider>
      </StateProvider>
    </AuthProvider>
  );
}
