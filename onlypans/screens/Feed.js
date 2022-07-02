import { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import Post from '../components/Post';
import { UserContext } from '../components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLatestPosts, refreshPost } from '../api';
import { useFocusEffect } from '@react-navigation/native';

const Feed = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(14);
  const [currentPost, setCurrentPost] = useState();

  const { loginState, logout } = useContext(UserContext);

  useEffect(() => {
    console.log('Fetching latest posts...');

    fetchLatestPosts(loginState.accessToken)
    .then(res => res.json())
    .then(posts => setPosts(() => posts))
    .catch(error => console.log('Error fetching latest posts', error))
    .finally(() => console.log('Fetched latest posts.'));
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (currentPost == null) return;
      
      console.log('Updating post...');

      refreshPost(loginState.accessToken, currentPost)
      .then(res => res.json())
      .then(post => {
        setPosts(posts.map(p => p.id === post.id ? post : p));
      })
      .catch(error => console.log('Error updating post', error))
      .finally(() => console.log('Updated post.'));
    }, [currentPost])
  );

  const handleOnEndReached = () => {
    setPosts([
      ...posts,
      {
        "id": index,
        "content": "Hehehehehhe",
        "mediaUrl": null,
        "likes": 1,
        "dislikes": 1,
        "liked": null,
        "disliked": null,
        "date": "2022-06-24T21:29:41.368Z"
      }
    ])

    // posts.push({
    //   "id": index,
    //   "content": "Hehehehehhe",
    //   "mediaUrl": null,
    //   "likes": 1,
    //   "dislikes": 1,
    //   "liked": null,
    //   "disliked": null,
    //   "date": "2022-06-24T21:29:41.368Z"
    // })

    setIndex(() => index + 1);

    console.log('on end');
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('accessToken');

    logout();
  }

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshing(false);
  }

  const navigate = (id, image) => {
    const post = posts.find(p => p.id === id);

    setCurrentPost(post.id);

    navigation.navigate('PostDetail', { post, image });
  }

  const renderItem = ({ item }) => (
    <Post 
      post={item}
      image={'https://picsum.photos/1920/1080'}
      navigate={navigate}
    />
  )

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