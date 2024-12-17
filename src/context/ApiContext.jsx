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

  const [loading, setLoading] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [apiUser, setApiUser] = useState(null);
  const [posters, setPosters] = useState([]);
  const [activePosters, setActivePosters] = useState([]);
  const [inActivePosters, setInActivePosters] = useState([]);
  const [userCredentials, setUserCredentials] = useState(() => {
    const savedCredentials = localStorage.getItem("userCredentials");
    return savedCredentials ? JSON.parse(savedCredentials) : null;
  });

  const navigate = useNavigate();

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
        toast.success("Registered Successfully.");
        navigate("/verify-email");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  console.log(userCredentials);


  const createUser = async (data) => {
    setLoading(true);
    try {
      const formData = createFormData(data);
      const user_credentials = userCredentials || JSON.parse(localStorage.getItem('userCredentials'))
      const res = await postRequest(
        collegeProfileCreationUrl + user_credentials.id,
        formData
      );

      if (
        res.status === 201 ||
        res.message === "College Profile Added Successfully"
      ) {
        setUserCredentials((prev) => ({
          ...prev,
          college_verified: "true",
        }));
      }
      await fetchUserData(user_credentials.uid, fetchForLogin=false)
      toast.success("Created Successfully.");
      navigate("/welcome");
    } catch (e) {
      console.log(e)
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (uid, fetchForLogin=true) => {
    try {
      const res = await getRequest(userLoginUrl + uid);
      const credentials = res.result[0];
      setUserCredentials(credentials); 
      const userDetails = await getRequest(
        collegeProfileUrl + credentials.college_id
      );
      setApiUser(userDetails.result);

      const userPosters = await getRequest(
        getEventsUrl + credentials.college_id
      );
      localStorage.setItem("userCredentials", JSON.stringify(credentials)); 


      setPosters(userPosters);
      console.log(credentials);

      if(fetchForLogin){
        if (credentials.email_verified != "true") {
          toast.warn('Your email is not verified, Please verify to continue the process.')
          navigate("/verify-email");
        } else if (
          credentials.proof_verified != "true" &&
          credentials.email_verified === "true"
        ) {
          toast.warn('Please wait till admin verify the details.')
          navigate("verify-admin");
        } else if (
          credentials.college_verified != "true" &&
          credentials.proof_verified === "true" &&
          credentials.email_verified === "true"
        ) {
          navigate("/create-user");
        } else {
          navigate("/welcome");
        }
      }
    } catch (e) {
      toast.error("Failed to Fetch user.");
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      localStorage.removeItem('userCredentials')
      const user = await loginFirebase(data.email, data.password);
      await fetchUserData(user.user.uid);
      toast.success('Login Successful.')
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
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data) => {
    setLoading(true);
    try {
      if (apiUser.admin_mail) {
        const formData = createFormData(
          data,
          { college_id: apiUser.id, email: apiUser.admin_mail },
          []
        );
        const response = await postRequest(addEventUrl, formData);
        const user = await getRequest(userLoginUrl + userCredentials.uid);
        setUserCredentials(user.result[0]);
        localStorage.setItem("userCredentials", JSON.stringify(user.result[0]));
        toast.success("Posted Successfully.");
        navigate("/dashboard");
      }
    } catch (e) {
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

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
      const res = await putRequest(collegeUpdateUrl, {
        ...data,
        college_id: userCredentials.id,
      });
      const user = await getRequest(userLoginUrl + userCredentials.uid);
      setUserCredentials(user.result[0]);
      localStorage.setItem("userCredentials", JSON.stringify(user.result[0]));
      setProfileUpdated(true);
      toast.success("Your profile has been updated successfully.");
      navigate("/dashboard");
    } catch (e) {
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
      toast.success("Details have been sent successfully.");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async () => {
    setLoading(true);
    try {
      if (!currentUser.emailVerified) {
        await verifyEmailFirebase();
        toast.success("Verification email sent successfully.");
      }
  
      const interval = setInterval(async () => {
        await currentUser.reload(); 
        if (currentUser.emailVerified) {
          clearInterval(interval);
          await verifyAdmin();
          navigate("/verify-admin"); 
        }
      }, 2000); 
    } catch (e) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  console.log(currentUser)
  
  const verifyAdmin = async () => {
    try {
      console.log("verifyAdmin is calling...");
      if (currentUser && currentUser.emailVerified) {
        await postRequest(emailStatusUpdateUrl + currentUser.uid);
        toast.success("Admin verified successfully");
      }
    } catch (e) {
      toast.error("Admin verification failed.");
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
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
      const storedCredentials =
        userCredentials || JSON.parse(localStorage.getItem("userCredentials"));

      if (storedCredentials) {
        try {
          // Fetch the user profile
          const userDetails = await getRequest(
            collegeProfileUrl + storedCredentials.college_id
          );
          setApiUser(userDetails.result);

          // Fetch the user's posters
          const userPosters = await getRequest(
            getEventsUrl + storedCredentials.college_id
          );
          setPosters(userPosters);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Failed to restore session. Please log in again.");
        }
      }
    };

    fetchData();
  }, [userCredentials]); // This dependency will ensure it triggers when userCredentials are updated

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
    fetchUserData,
    register,
    createUser,
    login,
    createPost,
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
