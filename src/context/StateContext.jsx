import { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export function useAppState() {
  return useContext(StateContext);
}

export function StateProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [profileUpdated, setProfileUpdated] = useState(false);
    const [loginCalled, setLoginCalled] = useState(false);
    const [apiUser, setApiUser] = useState(null);
    const [posters, setPosters] = useState([]);
    const [activePosters, setActivePosters] = useState([]);
    const [inActivePosters, setInActivePosters] = useState([]);
    const [eventCategory, setEventCategory] = useState([])
    const [userCredentials, setUserCredentials] = useState(() => {
      const savedCredentials = localStorage.getItem("userCredentials");
      return savedCredentials ? JSON.parse(savedCredentials) : null;
    });

  useEffect(() => {
    const activeEvents = posters.filter((event) => event.isactive === 1);
    const inActiveEvents = posters.filter((event) => event.isactive === 0);
    setActivePosters(activeEvents);
    setInActivePosters(inActiveEvents);
  }, [posters]);

  const value = {
    eventCategory,
    setEventCategory,
    userCredentials,
    setUserCredentials,
    apiUser,
    setApiUser,
    posters,
    setPosters,
    activePosters,
    inActivePosters,
    loading,
    setLoading,
    profileUpdated,
    setProfileUpdated,
    loginCalled, 
    setLoginCalled,
  };

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
}
