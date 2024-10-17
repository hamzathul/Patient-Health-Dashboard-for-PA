import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  // 3rd, to consume the values, we use this hook
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user") || null) // to get the information from browser local storage
  );

  return (
    // Wrap our application with the values
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
