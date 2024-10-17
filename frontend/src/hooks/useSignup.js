import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
    });
    if (!success) return;

    setLoading(true);

    try {
      const res = await axios.post("/auth/signup", {
        fullName,
        username,
        password,
      });

      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }

      // Local storage
      localStorage.setItem("user", JSON.stringify(data));

      // Context
      setAuthUser(data); // Update the context with user details
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
}) {
  if (!fullName || !username || !password ) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }
  return true;
}
