import React, { useState, useEffect, createContext, useContext } from "react";

const AppContext = createContext({
  theme: "light",
  palette: {},
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAppConfig = () => useContext(AppContext);

export default function AppContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [palette, setPalette] = useState({
    primary: "#FFFFFF",
    secondary: "#F4F4F4",
  });
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const value = {
    theme,
    palette,
    isLoggedIn,
    setLoggedIn,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
