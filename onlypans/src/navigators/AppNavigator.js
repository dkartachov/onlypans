import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../context/AuthProvider"
import MainNavigator from "./MainNavigator";
import AuthNavigator from "./AuthNavigator";
import jwtDecode from 'jwt-decode';

const AppNavigator = () => {
  const { auth, login } = useAuth();

  useEffect(() => {
    AsyncStorage.getItem('token')
    .then(token => {
      const decodedToken = token && jwtDecode(token);
      const { user, userId } = decodedToken || {};

      login(user, userId, token);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    auth.loading ? <></> : auth.token ? <MainNavigator /> : <AuthNavigator />
  );
}

export default AppNavigator;