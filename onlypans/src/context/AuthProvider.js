import { createContext, useContext, useReducer } from 'react';

export const ACTION = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
}

const AuthContext = createContext();

const authReducer = (prevState, payload) => {
  switch (payload.type) {
    case ACTION.LOGIN:
      return {
        ...prevState,
        loading: false,
        user: payload.user,
        userId: payload.userId,
        accessToken: payload.accessToken
      }
    case ACTION.LOGOUT:
      return {
        ...prevState,
        loading: false,
        user: null,
        userId: null,
        accessToken: null
      }
  }
}

const AuthProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(authReducer, {
    loading: true,
    user: null,
    userId: null,
    accessToken: null
  });

  const login = (user, userId, accessToken) => (
    dispatch({ type: ACTION.LOGIN, user, userId, accessToken })
  )

  const logout = () => (
    dispatch({ type: ACTION.LOGOUT })
  )

  return(
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;