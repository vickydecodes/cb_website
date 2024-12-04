import { useContext, createContext, useState, useEffect } from "react";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../utils/ApiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import axios from "axios";

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const { signup, loginFirebase, verifyEmailFirebase, logout, currentUser } =
    useAuth();

  // Base URLs
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const notificationUrl = import.meta.env.VITE_NOTIFICATION_URL;

  // Endpoints
  const userRegistrationUrl = `${baseUrl}${
    import.meta.env.VITE_USER_REGISTRATION_ENDPOINT
  }`;
  const emailStatusUpdateUrl = `${baseUrl}${
    import.meta.env.VITE_EMAIL_STATUS_UPDATE_ENDPOINT
  }`;
  const collegeProfileCreationUrl = `${baseUrl}${
    import.meta.env.VITE_COLLEGE_PROFILE_CREATION_ENDPOINT
  }`;
  const userLoginUrl = `${baseUrl}${import.meta.env.VITE_USER_LOGIN_ENDPOINT}`;
  const eventCategoryUrl = `${baseUrl}${
    import.meta.env.VITE_EVENT_CATEGORY_ENDPOINT
  }`;
  const addEventUrl = `${baseUrl}${import.meta.env.VITE_ADD_EVENT_ENDPOINT}`;
  const deleteEventUrl = `${baseUrl}${
    import.meta.env.VITE_DELETE_EVENT_ENDPOINT
  }`;
  const collegeProfileUrl = `${baseUrl}${
    import.meta.env.VITE_COLLEGE_PROFILE_ENDPOINT
  }`;
  const pushNotificationUrl = `${notificationUrl}${
    import.meta.env.VITE_PUSH_NOTIFICATION_ENDPOINT
  }`;

  const logUrls = () => {
    console.log("User Registration URL:", userRegistrationUrl);
    console.log("Email Status Update URL:", emailStatusUpdateUrl);
    console.log("College Profile Creation URL:", collegeProfileCreationUrl);
    console.log("User Login URL:", userLoginUrl);
    console.log("Event Category URL:", eventCategoryUrl);
    console.log("Add Event URL:", addEventUrl);
    console.log("Delete Event URL:", deleteEventUrl);
    console.log("College Profile URL:", collegeProfileUrl);
    console.log("Push Notification URL:", pushNotificationUrl);
  };

  logUrls();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (data) => {
    const user = await signup(data.email, data.password);
    try {
      if (user) {
        const user2 = await getRequest(collegeProfileUrl + "1");
        console.log(user2);
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

  const verifyAdmin = () => {
    try {
    } catch (e) {
      toast.error("Admin Verification Failed.");
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
