import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feed from './Feed';
import Profile from './Profile';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#C84B31',
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Feed':
              iconName = 'home';
              break;
            case 'Profile':
              iconName = 'person';
              break;
          }

          size = focused ? 28 : 25;

          return <MaterialIcons name={iconName} color={color} size={size} />
        }
      })}
    >
      <Tab.Screen
        name='Feed'
        component={Feed}
      />
      <Tab.Screen 
        name='Profile'
        component={Profile}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default Home;