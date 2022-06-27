import { useEffect, useState, useMemo, useReducer, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './components/Context';
import Feed from './screens/Feed';
import Home from './screens/Home';
import PostDetail from './screens/PostDetail';
import Login from './screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const Stack = createNativeStackNavigator();

const App = () => {
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          loading: false,
          user: action.user,
          userId: action.userId,
          accessToken: action.accessToken
        }
      case 'LOGOUT':
        return {
          ...prevState,
          loading: false,
          user: null,
          userId: null,
          accessToken: null
        }
      case 'SIGNUP':
        return {
          ...prevState,
          loading: false,
          user: action.user,
          userId: action.userId,
          accessToken: action.accessToken
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, {
    loading: true,
    user: null,
    userId: null,
    accessToken: null
  });

  const userContext = {
    login: (user, userId, accessToken) => {
      dispatch({ type: 'LOGIN', user, userId, accessToken })
    },
    logout: () => dispatch({ type: 'LOGOUT', user: null, userId: null, accessToken: null })
  }

  useEffect(() => {
    const lazyLoad = setTimeout(() => {
      AsyncStorage.getItem('accessToken')
        .then(accessToken => {
          const decodedToken = accessToken && jwtDecode(accessToken);
          const { user, userId } = decodedToken || {};

          userContext.login(user, userId, accessToken);
        })
        .catch(error => console.error(error));
    }, 500);

    return () => clearTimeout(lazyLoad);
  }, []);

  if (loginState.loading)
    return (
      <View 
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size={60} color={'red'} />
      </View>
    );
  else
    return (
      <UserContext.Provider value={{ loginState, login: userContext.login, logout: userContext.logout }}>
        <NavigationContainer>
          <Stack.Navigator>
            {loginState.accessToken ? (
              <>
                <Stack.Screen 
                  name='Home' 
                  component={Home}
                  options={{
                    title: 'Home',
                    headerShown: false,
                    headerStyle: {
                      backgroundColor: 'white',
                    },
                  }}
                />
                <Stack.Screen 
                  name='PostDetail'
                  component={PostDetail}
                  options={{
                    headerTitle: 'Post',
                    headerStyle: {
                      backgroundColor: 'white',
                    }
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen 
                  name='Login'
                  component={Login}
                  options={{
                    title: 'Login',
                    headerStyle: {
                      backgroundColor: 'white',
                    }
                  }}
                />
              </>
            )
          }
          </Stack.Navigator>
        </NavigationContainer>
      </UserContext.Provider>
    );
}

export default App;
