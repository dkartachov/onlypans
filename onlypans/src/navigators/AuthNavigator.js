import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen 
        name='Login'
        component={Login}
        options={{
          title: 'Login'
        }}
      />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;