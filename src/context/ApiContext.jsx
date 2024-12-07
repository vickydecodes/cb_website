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
  const getEventsUrl = `${baseUrl}${
    import.meta.env.VITE_COLLEGE_GET_EVENTS_ENDPOINT
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
    console.log("Get Events URL:", getEventsUrl);
  };

  const [loading, setLoading] = useState(false);

  const [apiUser, setApiUser] = useState(null);
  const [posters, setPosters] = useState([]);
  const [userCredentials, setUserCredentials] = useState(() => {
    const savedCredentials = localStorage.getItem("userCredentials");
    console.log(
      "Received item from local storage",
      JSON.parse(savedCredentials)
    );
    return savedCredentials ? JSON.parse(savedCredentials) : null;
  });



  const navigate = useNavigate();

  console.log("User credentials", userCredentials);

  const register = async (data) => {
    const user = await signup(data.admin_mail, data.password);
    try {
      if (user) {
        const formData = createFormData(data, { uid: user.user.uid }, [
          "password",
          "confirm_password",
        ]);
        const res = await postRequest(userRegistrationUrl, formData);
        console.log(res);
        toast.success("Registered Successfully.");
        navigate("/verify-email");
      }
    } catch (e) {
      console.log("error on registration", e);
      toast.error("Something Went Wrong.");
    }
  };

  const createUser = async (data) => {
    try {
      const formData = createFormData(data);
      const res = await postRequest(collegeProfileCreationUrl + "6", formData);
      console.log(res);
      toast.success("Created Successfully.");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
    }
  };

  const login = async (data) => {
    try {
      const user = await loginFirebase(data.email, data.password);
      const res = await getRequest(userLoginUrl + user.user.uid);
      console.log(res);
      setUserCredentials(res.result[0]);
      localStorage.setItem("userCredentials", JSON.stringify(res.result[0]));
      toast.success("Login Successfully.");
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
    }
  };

  const createPost = async (data) => {
    try {
      const formData = createFormData(data, { college_id: apiUser.id }, []);
      const response = await postRequest(addEventUrl, formData);
      console.log("Response from createpost: ", response);
      toast.success("Posted Successfully.");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
      console.log(e);
    }
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
      await verifyAdmin();
      toast.success("Sent Mail Successfully.");
      navigate("/verify-admin");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  const verifyAdmin = async () => {
    try {
      const res = await postRequest(emailStatusUpdateUrl + currentUser.uid);
      console.log(res);
      toast.success("Admin verified successfully");
    } catch (e) {
      toast.error("Admin Verification Failed.");
    }
  };

////USE EFFECT HOOKS

  useEffect(() => {
    const fetchData = async () => {
      console.log("use effect is running...");
      if (userCredentials) {
        try {
          const userDetails = await getRequest(
            collegeProfileUrl + userCredentials.college_id
          );
          console.log("user details from use effect", userDetails.result);
          setApiUser(userDetails.result);

          const userPosters = await getRequest(
            getEventsUrl + userCredentials.college_id
          );
          
          console.log('Posters use effect: ', userPosters)
          setPosters(userPosters);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to restore session. Please log in again.");
        }
      }
    };

    fetchData();
  }, [userCredentials]);

  ////UTILITY FUNCTIONS////

  ///FORM DATA BINDING////

  function createFormData(data, extraFields = {}, excludeKeys = []) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (!excludeKeys.includes(key)) {
        formData.append(key, value);
      }
    });

    Object.entries(extraFields).forEach(([key, value]) => {
      formData.append(key, value);
    });

    return formData;
  }

  const value = {
    apiUser,
    register,
    createUser,
    login,
    createPost,
    getUserData,
    deletePost,
    updateProfile,
    sendSupport,
    posters,
    verifyEmail,
    userCredentials,
    loading
  };

  return (
    <ApiContext.Provider value={value}>
      {!loading && children}
    </ApiContext.Provider>
  );
}
