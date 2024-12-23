import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigateOnce = () => {
  const navigationRef = useRef(null); 
  const navigate = useNavigate();

  const navigateOnce = (path) => {
    if (navigationRef.current !== path) {
      console.log(`[Navigating Once] To: ${path}`);
      navigationRef.current = path;
      navigate(path);
    }
  };

  return navigateOnce;
};
