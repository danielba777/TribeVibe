import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/users/find/${currentUser.id}`, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const login = async (inputs) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const updateUserContext = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      fetchCurrentUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, updateUserContext, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};