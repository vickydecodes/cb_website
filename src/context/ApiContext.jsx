import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const { signup, loginFirebase, verifyEmailFirebase, logout, currentUser } =
    useAuth();

  const url = import.meta.env.VITE_API_URL;

  console.log(url);

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (data) => {
    const user = await signup(data.email, data.password);
    try {
      if (user) {
        toast.success("Registered Successfully.");
        navigate("/verify-email");
      }
    } catch (e) {
      toast.error("Something Went Wrong.");
    }
  };

  const createUser = () => {
    toast.success("Created Successfully.");
    navigate("/dashboard");
  };

  const login = () => {
    toast.success("Login Successfully.");
    navigate("/dashboard");
  };

  const createPost = () => {
    toast.success("Posted Successfully.");
    navigate("/dashboard");
  };

  const getUserData = () => {};

  const deletePost = () => {
    toast.success("The post has been deleted.");
    navigate("/dashboard");
  };

  const updateProfile = () => {
    toast.success("Your profile has been updated successfully.");
    navigate("/dashboard");
  };

  const sendSupport = () => {
    toast.success("Details have been sent successfully.");
    navigate("/dashboard");
  };

  const verifyEmail = async () => {
    try {
      await verifyEmailFirebase();
      toast.success("Sent Mail Successfully.");
      navigate("/verify-admin");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  const value = {
    register,
    createUser,
    login,
    createPost,
    getUserData,
    deletePost,
    updateProfile,
    sendSupport,
    verifyEmail,
  };

  return (
    <ApiContext.Provider value={value}>
      {!loading && children}
    </ApiContext.Provider>
  );
}
