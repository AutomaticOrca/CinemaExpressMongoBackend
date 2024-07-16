import { useCallback, useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";

import CommonLayout from "./shared/layouts/CommonLayout";
import Home from "./shared/pages/Home";
import Auth from "./user/pages/Auth";
import UserProfile from "./user/pages/UserProfile";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  // const login = useCallback((uid, token, expirationDate) => {
  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    // const tokenExpirationDate =
    //   expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    // setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        // expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    // setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  const ProtectedRoute = ({ element: Component, ...rest }) => {
    return token ? <Component {...rest} /> : <Navigate to="/auth" />;
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token
      // storedData.token &&
      // new Date(storedData.expiration) > new Date()
    ) {
      // login(storedData.userId, storedData.token, new Date(storedData.expiration));
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <CommonLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/user-profile"
              element={<ProtectedRoute element={UserProfile} />}
            />
          </Routes>
        </CommonLayout>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
