import { useContext, createContext, useState, useEffect } from "react";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "../utils/ApiService";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import Loading from "../pages/components/Loading/Loading";
import { useNavigateOnce } from "../utils/UseNavigateOnce";
import { getCookie, setCookie, removeCookie } from "../utils/CookieService";
import urls from "../utils/ApiUrls";

const {
  userRegistrationUrl,
  emailStatusUpdateUrl,
  collegeProfileCreationUrl,
  userLoginUrl,
  addEventUrl,
  deleteEventUrl,
  collegeProfileUrl,
  collegeUpdateUrl,
  pushNotificationUrl,
  editPostUrl,
  sendSupportUrl,
  getEventsUrl,
  getEventCategoriesUrl,
} = urls;
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

  const fetchUserData = async (uid, fetchForLogin = false) => {
    try {
      const res = await getRequest(userLoginUrl + uid);
      const credentials = res.result[0];
      setUserCredentials((prev) => {
        const updatedCredentials = { ...prev, ...credentials };
        if (fetchForLogin) handleNavigation(updatedCredentials);
        return updatedCredentials;
      });

      const userDetails = await getRequest(
        collegeProfileUrl + credentials.college_id
      );
      setApiUser(userDetails.result);

      const userPosters = await getRequest(
        getEventsUrl + credentials.college_id
      );
      setPosters(userPosters);
      setCookie("userCredentials", credentials);
    } catch (e) {
      toast.error("Failed to Fetch user.");
    }
  };

  const navigateTo = useNavigate();
  const location = useLocation();

  console.log("current path ", location.pathname);

  const [loading, setLoading] = useState(false);
  const [apiUser, setApiUser] = useState(null);
  const [posters, setPosters] = useState([]);
  const [activePosters, setActivePosters] = useState([]);
  const [inActivePosters, setInActivePosters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVerifiedUser, setIsVerifiedUser] = useState(() => {
    const savedCredentials = getCookie("userCredentials");

    if (!savedCredentials) {
      return false;
    }
    try {
      const verified =
        savedCredentials.email_verified === "true" &&
        savedCredentials.proof_verified === "true" &&
        savedCredentials.college_verified === "true";

      return verified;
    } catch (error) {
      console.error("Error parsing user credentials:", error);
      return false;
    }
  });

  const [userCredentials, setUserCredentials] = useState(() => {
    const savedCredentials = getCookie("userCredentials");
    console.log("saved credentials in cookies", savedCredentials);
    if (savedCredentials) {
      fetchUserData(savedCredentials.uid);
    }
    return savedCredentials ? savedCredentials : null;
  });

  // console.log("User Credentials: ", userCredentials);
  // console.log("Api User: ", apiUser);

  const navigate = useNavigateOnce();

  const register = async (data) => {
    try {
      removeCookie("userCredentials");
      setLoading(true);
      const user = await signup(data.admin_mail, data.password);
      if (user) {
        const formData = createFormData(data, { uid: user.user.uid }, [
          "password",
          "confirm_password",
        ]);
        const res = await postRequest(userRegistrationUrl, formData);
        fetchUserData(user.user.uid);
        toast.success(res.message);
        setCookie("college_name", data.college_name);
      }
    } catch (e) {
      handleFirebaseError(e);
      navigateTo('/register')
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (data) => {
    setLoading(true);
    try {
      const formData = createFormData(data);
      const user_credentials =
        userCredentials || JSON.parse(getCookie("userCredentials"));
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
      await fetchUserData(user_credentials.uid, false);
      toast.success("Created Successfully.");
      navigate("/welcome");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
      removeCookie("college_name");
    }
  };

  const handleNavigation = (credentials) => {
    const { email_verified, proof_verified, college_verified } = credentials;

    if (email_verified !== "true") {
      toast.warn(
        "Your email is not verified, Please verify to continue the process."
      );
      return navigateTo("/verify-email");
    }

    if (proof_verified !== "true") {
      toast.warn("Please wait till admin verify the details.");
      return navigateTo("/verify-admin");
    }

    if (college_verified !== "true") {
      toast.warn("Please fill the details to get started.");
      return navigateTo("/create-user");
    }
  };

  const login = async (data) => {
    setLoading(true);
    try {
      removeCookie("userCredentials");
      const user = await loginFirebase(data.email, data.password);
      fetchUserData(user.user.uid, true);
    } catch (e) {
      console.log(e);
      handleFirebaseError(e);
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
      if (!apiUser.admin_mail) {
        toast.error("Something Went Wrong.");
        return navigate("/login");
      }
      const formData = createFormData(
        data,
        { college_id: apiUser.id, email: apiUser.admin_mail },
        []
      );
      const res = await postRequest(addEventUrl, formData);
      fetchUserData(userCredentials.uid);
      console.log(res);
      toast.success(res.message || "Posted Successfully.");
      navigateTo("/dashboard");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (data) => {
    setLoading(true);
    try {
      const res = await deleteRequest(deleteEventUrl + data);
      fetchUserData(userCredentials.uid);
      navigate("/dashboard", res.message, "success");
    } catch (e) {
      toast.error("Something Went Wrong.");
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
      fetchUserData(userCredentials.uid);
      toast.success(
        res.message || "Your profile has been updated successfully."
      );
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
      navigate("/dashboard");
    } finally {
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
      toast.success(res.message || "Feedback have been sent successfully.");
      navigate("/dashboard");
    } catch (e) {
      toast.error("Something Went Wrong.");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await getRequest(getEventCategoriesUrl);
      setCategories(res);
    } catch (e) {
      toast.error(e.message);
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
      toast.error(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAdmin = async () => {
    try {
      if (currentUser && currentUser.emailVerified) {
        await postRequest(emailStatusUpdateUrl + currentUser.uid);
        toast.success("Email verified successfully");
      }
    } catch (e) {
      toast.error(e.message || "Admin verification failed.");
    }
  };

  const editPost = async (data) => {
    setLoading(true);
    try {
      const res = await putRequest(editPostUrl + data.poster_id, data);
      fetchUserData(userCredentials.uid);
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
      removeCookie("userCredentials");
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (e) {
      toast.error(e.message || "Failed to logout.");
    } finally {
      setLoading(false);
    }
  };

  ////USE EFFECT HOOKS

  useEffect(() => {
    const activeEvents = posters.filter((event) => event.isactive === 1);
    const inActiveEvents = posters.filter((e) => e.isactive === 0);
    setInActivePosters(inActiveEvents);
    setActivePosters(activeEvents);
  }, [posters]);

  useEffect(() => {
    const fetchData = async () => {
      const storedCredentials =
        userCredentials || JSON.parse(getCookie("userCredentials"));

      if (storedCredentials) {
        try {
          const userDetails = await getRequest(
            collegeProfileUrl + storedCredentials.college_id
          );
          setApiUser(userDetails.result);

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

    if (!userCredentials) {
      fetchData();
    }
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

  ///END UTILS

  /// ERROR HANDLING FOR FIREBASE ERRORS

  const handleFirebaseError = (e) => {
    const errorCode = e.code;
    const errorMessage = e.message;

    switch (errorCode) {
      case "auth/invalid-email":
        toast.error(
          "The email address is invalid. Please enter a valid email."
        );
        break;
      case "auth/user-not-found":
        toast.error(
          "No user found with this email. Please check your email or sign up."
        );
        break;
      case "auth/wrong-password":
        toast.error(
          "Incorrect password. Please try again or reset your password."
        );
        break;
      case "auth/email-already-in-use":
        toast.error("This email is already in use.");
        break;
      case "auth/weak-password":
        toast.error(
          "The password is too weak. Please choose a stronger password."
        );
        break;
      case "auth/invalid-credential":
        toast.error(
          "The email or password you entered is invalid. Please try again."
        );
        break;
      case "auth/user-disabled":
        toast.error(
          "This account has been disabled. Please contact support for assistance."
        );
        break;
      case "auth/too-many-requests":
        toast.error("Too many attempts. Please try again later.");
        break;
      case "auth/operation-not-allowed":
        toast.error("This operation is not allowed. Please contact support.");
        break;
      case "auth/expired-action-code":
        toast.error("The action code has expired. Please try again.");
        break;
      case "auth/network-request-failed":
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
        break;
      case "auth/invalid-verification-code":
        toast.error(
          "Invalid verification code. Please check the code and try again."
        );
        break;
      default:
        toast.error(errorMessage || "Something went wrong. Please try again.");
    }
  };

  ///ERROR HANDLING FOR LOADINGS AND ERRORS

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
    getCategories,
    categories,
    isVerifiedUser,
  };
  if (loading) {
    console.log("Loading state: ", loading);
  }

  return (
    <ApiContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </ApiContext.Provider>
  );
}
