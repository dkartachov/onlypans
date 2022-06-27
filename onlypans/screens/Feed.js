import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import PostFeed from '../components/PostFeed';
import env from '../env';
import { UserContext } from '../components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderItem = ({ item }) => (
  <PostFeed 
    post={item}
    image={"https://picsum.photos/1920/1080"}
  />
)

const Feed = ({ navigation }) => {
  const [initialFetch, setInitialFetch] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);

  const { loginState, logout } = useContext(UserContext);

  useEffect(() => {
    console.log('fetching posts...');

    fetch(`${env.ONLYPANS_API_URL}/api/v1/posts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${loginState.accessToken}`
      }
    })
    .then(res => res.json())
    .then(posts => setPosts(posts))
    .catch(error => console.log('error fetching posts', error))
    .finally(() => {
      setRefreshing(false);
      console.log('fetched posts successfully')
    });

  }, [refreshing]);

  const handleOnEndReached = () => {
    if (initialFetch) {
      setInitialFetch(false);

      return;
    }
    console.log('on end');
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');

    logout();
  }

  const onRefresh = () => {
    setRefreshing(true);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={handleOnEndReached}
        removeClippedSubviews={true}
        // ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
        ListFooterComponent={posts.length && <ActivityIndicator size={40} color={'red'} />}
        contentContainerStyle={{flexGrow: 1}}
      />
      <FAB icon={() => <MaterialIcons size={24} name='logout'/>} onPress={handleLogout} style={styles.fab}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fab: {
    backgroundColor: 'lightblue',
    position:'absolute', 
    alignItems: 'center',
    alignContent: 'center',
    width: 60, 
    height: 60, 
    borderRadius: 30,
    right: 0, 
    bottom: 0, 
    margin: 5, 
  }
});

export default Feed;