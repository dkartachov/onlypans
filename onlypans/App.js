import { useEffect, useState, useMemo, useReducer, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './components/Context';
import Feed from './screens/Feed';
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
          accessToken: action.accessToken
        }
      case 'LOGOUT':
        return {
          ...prevState,
          loading: false,
          user: null,
          accessToken: null
        }
      case 'SIGNUP':
        return {
          ...prevState,
          loading: false,
          user: action.user,
          accessToken: action.accessToken
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, {
    loading: true,
    user: null,
    accessToken: null
  });

  const userContext = {
    login: (username, accessToken) => {
      dispatch({ type: 'LOGIN', user: username, accessToken })
    },
    logout: () => dispatch({ type: 'LOGOUT', user: null, accessToken: null })
  }

  useEffect(() => {
    const lazyLoad = setTimeout(() => {
      AsyncStorage.getItem('accessToken')
        .then(accessToken => {
          const username = accessToken && jwtDecode(accessToken).username;

          userContext.login(username, accessToken);
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
      <UserContext.Provider value={{ login: userContext.login, logout: userContext.logout }}>
        <NavigationContainer>
          <Stack.Navigator>
            {loginState.accessToken ? (
              <>
                <Stack.Screen 
                  name='Home' 
                  component={Feed}
                  options={{
                    title: 'Home',
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
