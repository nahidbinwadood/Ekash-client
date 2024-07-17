import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { axiosPublic } from "../Hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authInfo = {
    loading,
    user,
    setLoading,
    setUser,
  };

  //observer:
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const email = localStorage.getItem("email");
  //       console.log(email);
  //       if (email) {
  //         const { data } = await axiosPublic.post("/user", email);
  //         console.log(data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  // }, []);


  useEffect(() => {
    if (user) {
      const userInfo = { email: user.email };
      axiosPublic.post("/jwt", userInfo).then((res) => {
        if (res.data.token) {
          localStorage.setItem("access-token", res.data.token);
        }
      });
    } else {
      localStorage.removeItem("access-token");
    }
    setLoading(false);
  }, [user]);
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
};

export default AuthProvider;
