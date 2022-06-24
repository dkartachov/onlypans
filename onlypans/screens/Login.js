import { useState, useContext } from 'react';
import { StyleSheet, View, Text, Keyboard, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { UserContext } from '../components/Context';
import env from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    Keyboard.dismiss();

    if (!username || !password) {
      console.log('missing username or password');

      return;
    }

    const res = await fetch(`${env.ONLYPANS_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (res.status !== 200) {
      setUsername(null);
      setPassword(null);

      console.log('wrong credentials');

      return;
    }

    const { accessToken } = await res.json();

    await AsyncStorage.setItem('accessToken', accessToken);

    login(username, accessToken);
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
    backgroundColor: 'white',
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