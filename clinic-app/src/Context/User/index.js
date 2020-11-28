import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { config } from "../../Config";

const defaultContext = {
  userInfo: undefined,
  login: (email, password) => {},
  getUserInfo: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultContext);

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(undefined);

  const login = async (email, password) => {
    // Use Eamil and Passowrd for login API
    // Get token and UserInfo via Login API
    try {
      const res = await axios.post(config.host + "/api/auth/signin", {
        email,
        password,
      });
      // console.log(res?.data);
      if (res?.data?.success) {
        AsyncStorage.setItem("token", res?.data?.user?.accessToken).then(() => {
          setUserInfo(res?.data?.user);
          AsyncStorage.setItem("user", JSON.stringify(res?.data?.user));
        });
        return {
          success: true,
        };
      } else {
        return {
          success: false,
          message: res?.data?.message,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err?.message,
      };
    }
  };

  const verifyToken = async (token) => {
    // Use Eamil and Passowrd for login API
    // Get token and UserInfo via Login API
    try {
      const res = await axios.post(config.host + "/api/auth/verify", {
        token,
      });
      console.log(res?.data);
      if (res?.data?.success) {
        return true;
      }
      Alert.alert(res?.data?.message);
      return;
    } catch (err) {
      console.log("veri api err => ", err?.response);
      return {
        success: false,
        message: err?.message,
      };
    }
  };

  const getUserInfo = () => {
    AsyncStorage.getItem("token")
      .then(async (token) => {
        if (token) {
          try {
            console.log("need verify token");
            const isValid = await verifyToken(token);
            if (isValid) {
              console.log("verify success");
              AsyncStorage.getItem("user").then((user) => {
                setUserInfo(JSON.parse(user));
              });
            } else {
              console.log("verify failed");
              logout();
            }
          } catch (err) {
            console.log("verify err => ", err);
            logout();
          }
        }
      })
      .catch((e) => {
        console.log("error =>", e);
        setUserInfo(undefined);
      });
  };

  const logout = () => {
    AsyncStorage.removeItem("token");
    setUserInfo(undefined);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        login,
        getUserInfo,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
