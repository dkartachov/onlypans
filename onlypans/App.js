import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigators/AppNavigator';
import AuthProvider from './src/context/AuthProvider';

const Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C84B31',
    primaryDisabled: '#dddddd66',
    background: '#191919',
    card: '#191919',
    text: '#f0f0f0',
    textPlaceholder: '#888888'
    // border: '',
    // notification: '',
  }
};

const App = () => {
    return (
      <AuthProvider>
        <NavigationContainer theme={Theme}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </NavigationContainer>
      </AuthProvider>
    );
}

export default App;
