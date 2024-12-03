import { useContext, createContext, useState, useEffect } from "react";
import { auth } from "../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const signup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginFirebase = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const verifyEmailFirebase = async () => {
    return await sendEmailVerification(currentUser);
  };

  const logout = async () => {
    return await auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, loginFirebase , verifyEmailFirebase, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
