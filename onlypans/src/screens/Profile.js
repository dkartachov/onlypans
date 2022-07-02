import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserContext } from '../components/Context';

const Profile = () => {
  const { loginState } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>{loginState.user}</Text>
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