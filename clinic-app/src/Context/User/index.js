import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { config } from "~/Config";
import Spinner from "~/Component/Common/Spinner";

const defaultContext = {
  userInfo: undefined,
  login: (email, password) => {},
  getUserInfo: () => {},
  logout: () => {},
};

const UserContext = createContext(defaultContext);

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await axios.post(config.host + "/api/auth/signin", {
        email,
        password,
      });
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
            setLoading(true);
            const isValid = await verifyToken(token);
            setLoading(false)
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
            setLoading(false);
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
    <>
      {children}
      {loading ? <Spinner /> : null}
    </>
    </UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
