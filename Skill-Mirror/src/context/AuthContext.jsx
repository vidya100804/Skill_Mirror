import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("skillmirror_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      console.error("Failed to load user from localStorage:", e);
      return null;
    }
  });

  const login = (data) => {
    try {
      localStorage.setItem("skillmirror_user", JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save user to localStorage:", e);
    }
    setUser(data);
  };

  const logout = () => {
    try {
      localStorage.removeItem("skillmirror_user");
    } catch (e) {
      console.error("Failed to remove user from localStorage:", e);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
