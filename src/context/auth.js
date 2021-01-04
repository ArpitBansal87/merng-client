import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  trakt_access_token: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.clear();
  } else {
    initialState.user = decodedToken;
  }
}

if (localStorage.getItem("access_token")) {
  const accessTokenValue = localStorage.getItem("access_token");
  initialState.trakt_access_token = accessTokenValue;
}

const AuthContext = createContext({
  user: null,
  trakt_access_token: null,
  login: (data) => {},
  logout: () => {},
  loginTrakt: (data) => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        trakt_access_token: null,
      };
    case "TRAKT_LOGIN":
      return {
        ...state,
        trakt_access_token: action.payload,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("access_token");
    dispatch({
      type: "LOGOUT",
    });
  };

  const loginTrakt = (access_token) => {
    localStorage.setItem("access_token", access_token);
    dispatch({
      type: "TRAKT_LOGIN",
      payload: access_token,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        trakt_access_token: state.trakt_access_token,
        login,
        logout,
        loginTrakt,
      }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
