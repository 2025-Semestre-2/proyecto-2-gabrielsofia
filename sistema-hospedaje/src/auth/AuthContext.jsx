import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // SIMULACIÓN (esto luego viene del backend)
    if (email === "admin@hotel.com") {
      setUser({ email, role: "ADMIN" });
    } else {
      setUser({ email, role: "USUARIO" });
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);