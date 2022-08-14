import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import PostDetail from '../screens/PostDetail';
import AddPost from '../modals/AddPost';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Group
        screenOptions={{
          animation: 'slide_from_right'
        }}
      >
        <MainStack.Screen 
          name='Home' 
          component={Home}
          options={{
            title: 'Home',
            headerShown: false
          }}
        />
        <MainStack.Screen
          name='PostDetail'
          component={PostDetail}
          options={{
            headerTitle: 'Post'
          }}
        />
      </MainStack.Group>
      <MainStack.Group
        screenOptions={{
          presentation: 'fullScreenModal',
          animation: 'slide_from_bottom'
        }}
      >
        <MainStack.Screen 
          name='AddPost'
          component={AddPost}
        />
      </MainStack.Group>
    </MainStack.Navigator>
  );
}

export default MainNavigator;
