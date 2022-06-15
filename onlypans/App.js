import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import PostDetail from './screens/PostDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Home' 
          component={Home}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
