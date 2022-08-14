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
    AsyncStorage.getItem('accessToken')
    .then(accessToken => {
      const decodedToken = accessToken && jwtDecode(accessToken);
      const { user, userId } = decodedToken || {};

      login(user, userId, accessToken);
    })
    .catch(error => console.log(error));
  }, []);

  return (
    auth.loading ? <></> : auth.accessToken ? <MainNavigator /> : <AuthNavigator />
  );
}

export default AppNavigator;