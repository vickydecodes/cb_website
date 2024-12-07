import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Register from "../pages/Register/Register.jsx";
import VerifyE from "../pages/VerifyE/VerifyE.jsx";
import VerifyA from "../pages/VerifyA/VerifyA.jsx";
import Login from "../pages/Login/Login.jsx";
import CreateProfile from "../pages/CreateProfile/CreateProfile.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import CreatePost from "../pages/CreatePost/CreatePost.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { ApiProvider } from "../context/ApiContext.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <ApiProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyE />} />
          <Route path="/verify-admin" element={<VerifyA />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-user" 
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-post" 
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            } 
          />
        </Routes>
      </ApiProvider>
    </AuthProvider>
  );
}
