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
import Loading from "../pages/components/Loading/Loading";
import axios from "axios";

const ApiContext = createContext();

export function useApi() {
  return useContext(ApiContext);
}

export function ApiProvider({ children }) {
  const {
    signup,
    loginFirebase,
    verifyEmailFirebase,
    logout,
    currentUser,
    forgetPasswordFirebase,
  } = useAuth();

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
  const collegeUpdateUrl = `${baseUrl}${
    import.meta.env.VITE_COLLEGE_PROFILE_UPDATE_ENDPOINT
  }`;
  const pushNotificationUrl = `${notificationUrl}${
    import.meta.env.VITE_PUSH_NOTIFICATION_ENDPOINT
  }`;
  const editPostUrl = `${baseUrl}${import.meta.env.VITE_EDIT_POSTER}`;
  const sendSupportUrl = `${baseUrl}${
    import.meta.env.VITE_COLLEGE_SUPPORT_ENDPOINT
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
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [apiUser, setApiUser] = useState(null);
  const [posters, setPosters] = useState([]);
  const [activePosters, setActivePosters] = useState([]);
  const [inActivePosters, setInActivePosters] = useState([]);
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
    setLoading(true);
    try {
      const user = await signup(data.admin_mail, data.password);
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
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    setLoading(true);

    try {
      const formData = createFormData(data);
      const res = await postRequest(
        collegeProfileCreationUrl + userCredentials.id,
        formData
      );
      console.log(res);
      toast.success("Created Successfully.");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const forgetPassword = async (data) => {
    setLoading(true);
    try {
      const res = await forgetPasswordFirebase(data.email);
      navigate("/login");
      toast.success("Your password reset link is sent to your mail.");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data) => {
    setLoading(true);

    try {
      const formData = createFormData(data, { college_id: apiUser.id }, []);
      const response = await postRequest(addEventUrl, formData);
      const user = await getRequest(userLoginUrl + userCredentials.uid);
      setUserCredentials(user.result[0]);
      localStorage.setItem("userCredentials", JSON.stringify(user.result[0]));
      console.log("Response from createpost: ", response);
      toast.success("Posted Successfully.");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getUserData = () => {};

  const deletePost = async (data) => {
    setLoading(true);
    try {
      const res = await deleteRequest(deleteEventUrl + data);
      toast.success(res.message);
      const user = await getRequest(userLoginUrl + userCredentials.uid);
      setUserCredentials(user.result[0]);
      localStorage.setItem("userCredentials", JSON.stringify(user.result[0]));
      navigate("/dashboard");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data) => {
    setLoading(true);

    try {
      console.log("data in the update proffile", data);
      const res = await putRequest(collegeUpdateUrl, {
        ...data,
        college_id: userCredentials.id,
      });
      console.log("response from updateprofile", res);
      const user = await getRequest(userLoginUrl + userCredentials.uid);
      setUserCredentials(user.result[0]);
      localStorage.setItem("userCredentials", JSON.stringify(user.result[0]));
      setProfileUpdated(true);
      toast.success("Your profile has been updated successfully.");
      navigate("/dashboard");
    } catch (e) {
      console.log("Error from updateprofile:", e);
      toast.error("Something Went Wrong.");
      navigate("/dashboard");
    } finally {
      setProfileUpdated(false);
      setLoading(false);
    }
  };

  const sendSupport = async (data) => {
    setLoading(true);

    try {
      const res = await postRequest(sendSupportUrl, {
        ...data,
        college_id: userCredentials.college_id,
      });
      console.log("Response from send support", res);
      toast.success("Details have been sent successfully.");
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setLoading(true);

    try {
      await verifyEmailFirebase();
      await verifyAdmin();
      toast.success("Sent Mail Successfully.");
      navigate("/verify-admin");
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAdmin = async () => {
    setLoading(true);

    try {
      if (currentUser && currentUser.emailVerified) {
        const res = await postRequest(emailStatusUpdateUrl + currentUser.uid);
        console.log(res);
        toast.success("Admin verified successfully");
      } else {
        setTimeout(async () => {
          console.log("Rechecking email verification status...");
          await verifyAdmin();
        }, 5000);
      }
    } catch (e) {
      toast.error("Admin Verification Failed.");
    } finally {
      setLoading(false);
    }
  };

  const editPost = async (data) => {
    setLoading(true);
    try {
      const res = await putRequest(editPostUrl + data.poster_id, data);
      const user = await getRequest(userLoginUrl + userCredentials.uid);
      setUserCredentials(user.result[0]);
      localStorage.setItem("userCredentials", JSON.stringify(user.result[0]));
      toast.success(res.message);
    } catch (e) {
      toast.error("Something Went Wrong.");
      navigate("/dashboard");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      console.log("logout function called.");
      await logout();
      setUserCredentials(null);
      setApiUser(null);
      setPosters([]);
      localStorage.removeItem("userCredentials");
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (e) {
      toast.error("Failed to logout.");
    } finally {
      setLoading(false);
    }
  };

  ////USE EFFECT HOOKS

  useEffect(() => {
    const activeEvents = posters.filter((event) => event.isactive === 1); // Assuming isactive indicates if the event is active
    const inActiveEvents = posters.filter((e) => e.isactive === 0);
    setInActivePosters(inActiveEvents);
    setActivePosters(activeEvents);
  }, [posters]);

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

          console.log("Posters use effect: ", userPosters);
          setPosters(userPosters);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to restore session. Please log in again.");
        }
      }
    };

    fetchData();
  }, [userCredentials, profileUpdated]);

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
    loading,
    handleLogout,
    editPost,
    activePosters,
    inActivePosters,
    forgetPassword,
  };

  return (
    <ApiContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </ApiContext.Provider>
  );
}
