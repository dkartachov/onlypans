import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthProvider';

const Profile = () => {
  const { auth } = useAuth();

  return (
    <View style={styles.container}>
      <Text>{auth.user}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Profile;