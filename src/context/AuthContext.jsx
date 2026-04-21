import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, loginUser, registerUser } from "../services/authService";
import {
  clearAuthSession,
  getAccessToken,
  getAuthUser,
  getRefreshToken,
  setAuthSession,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(getAuthUser());
  const [accessToken, setAccessToken] = useState(getAccessToken());
  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuthSession();
      setAuthUser(null);
      setAccessToken(null);
      setRefreshToken(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  useEffect(() => {
    const bootstrapUser = async () => {
      if (!accessToken) return;
      try {
        const data = await getCurrentUser();
        if (data?.user) {
          setAuthSession({
            token: accessToken,
            refreshToken,
            user: data.user,
          });
        }
      } catch (error) {
        console.error("Failed to bootstrap auth user", error);
        clearAuthSession();
      }
    };

    bootstrapUser();
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const handleSessionUpdated = () => {
      setAuthUser(getAuthUser());
      setAccessToken(getAccessToken());
      setRefreshToken(getRefreshToken());
    };
    window.addEventListener("auth:session-updated", handleSessionUpdated);
    return () => window.removeEventListener("auth:session-updated", handleSessionUpdated);
  }, []);

  const login = async (payload) => {
    const data = await loginUser(payload);
    setAuthSession(data);
    setAuthUser(data.user || null);
    setAccessToken(data.token || null);
    setRefreshToken(data.refreshToken || null);
    return data;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    setAuthSession(data);
    setAuthUser(data.user || null);
    setAccessToken(data.token || null);
    setRefreshToken(data.refreshToken || null);
    return data;
  };

  const logout = () => {
    clearAuthSession();
    setAuthUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value = useMemo(
    () => ({
      authUser,
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken && authUser),
      isFarmer: authUser?.role === "farmer",
      login,
      register,
      logout,
    }),
    [authUser, accessToken, refreshToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
