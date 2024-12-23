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
import { useNavigateOnce } from "../utils/UseNavigateOnce";
import { getCookie, setCookie, removeCookie } from "../utils/CookieService";
import urls from '../utils/ApiUrls';

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
  getEventCategoriesUrl
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

  const [loading, setLoading] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [apiUser, setApiUser] = useState(null);
  const [posters, setPosters] = useState([]);
  const [activePosters, setActivePosters] = useState([]);
  const [inActivePosters, setInActivePosters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCredentials, setUserCredentials] = useState(() => {
    const savedCredentials = getCookie("userCredentials");
    return savedCredentials ? savedCredentials : null;
  });

  console.log('User Credentials: ',userCredentials)
  console.log('Api User: ', apiUser)

  const navigate = useNavigateOnce();

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
      await fetchUserData(user_credentials.uid, (fetchForLogin = false));
      toast.success("Created Successfully.");
      navigate("/welcome");
    } catch (e) {
      console.log(e);
      toast.error("Something Went Wrong.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (uid, fetchForLogin = true) => {
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

  const handleNavigation = (credentials) => {
    const { email_verified, proof_verified, college_verified } = credentials;

    if (email_verified !== "true") {
      toast.warn(
        "Your email is not verified, Please verify to continue the process."
      );
      return navigate("/verify-email");
    }

    if (proof_verified !== "true") {
      toast.warn("Please wait till admin verify the details.");
      return navigate("/verify-admin");
    }

    if (college_verified !== "true") {
      return navigate("/create-user");
    }
// console.log('from fetchdata')
//     navigate("/welcome");
  };


  const login = async (data) => {
    setLoading(true);
    try {
      removeCookie("userCredentials");
      const user = await loginFirebase(data.email, data.password);
      await fetchUserData(user.user.uid);
      toast.success("Login Successful.");
      // console.log('from login')
      // navigate("/welcome");
    } catch (e) {
      console.log(e);
      if (e.message === "Firebase: Error (auth/invalid-credential).") {
        toast.error("Password or Email is invalid.");
      } else {
        toast.error(e.message || "Something Went Wrong.");
      }
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
        setCookie("userCredentials", user.result[0]);
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
      setCookie("userCredentials", user.result[0]);
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
      setCookie("userCredentials", user.result[0]);
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
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const verifyAdmin = async () => {
    try {
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
      setCookie("userCredentials", user.result[0]);
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
      toast.error("Failed to logout.");
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



  ///END UTILS

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
  };

  return (
    <ApiContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </ApiContext.Provider>
  );
}
