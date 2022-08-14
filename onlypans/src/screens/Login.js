import { useState } from 'react';
import { StyleSheet, View, Text, Keyboard, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthProvider';
import env from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = useAuth();

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!username || !password) {
      console.log('missing username or password');

      return;
    }

    const res = await fetch(`${env.ONLYPANS_API_URL}/api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    switch (res.status) {
      case 200:
        const { accessToken } = await res.json();

        await AsyncStorage.setItem('accessToken', accessToken);

        const userId = jwtDecode(accessToken).userId
  
        login(username, userId, accessToken);

        break;
      case 403:
        setPassword(null);

        console.log('Incorrect password');

        break;
      case 404:
        setUsername(null);
        setPassword(null);
  
        console.log('User not found');

        break;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <TextInput
          value={username}
          style={styles.textInput}
          onChangeText={text => setUsername(text)}
          placeholder='Username'
        />
        <TextInput
          value={password}
          style={styles.textInput}
          onChangeText={text => setPassword(text)}
          placeholder='Password'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'grey' }]}
        >
          <Text style={{ fontSize: 20, color: 'white' }}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginTop: 5,
    width: 200,
    borderRadius: 20,
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 5,
  },
  textInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    width: '60%',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
  }
});

export default Login;