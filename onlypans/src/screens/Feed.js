import { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import FAB from '../components/FAB';
import Post from '../components/Post';
import { useAuth } from '../context/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPosts, refreshPost } from '../api';
import { useFocusEffect, useTheme } from '@react-navigation/native';

const image = 'https://picsum.photos/1920/1080';

const Feed = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(14);
  const [currentPost, setCurrentPost] = useState();
  const [latestPostId, setLatestPostId] = useState();
  const [oldestPostId, setOldestPostId] = useState();

  const { auth, logout } = useAuth();

  useEffect(() => {
    console.debug('Fetching latest posts...');

    fetchPosts(auth.token)
    .then(res => res.json())
    .then(posts => {
      setPosts(posts);
      setLatestPostId(posts[0].id);
      setOldestPostId(posts[posts.length - 1].id);

      console.debug('Fetched latest posts.');
    })
    .catch(error => console.debug('Error fetching latest posts', error));
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (currentPost == null) return;
      
      console.debug('Updating post...');

      refreshPost(auth.token, currentPost)
      .then(res => res.json())
      .then(post => {
        setPosts(posts.map(p => p.id === post.id ? post : p));
        return post;
      })
      .then(post => console.debug(`Updated post ${post.id}`))
      .catch(error => console.debug('Error updating post', error));
    }, [currentPost])
  );

  const handleOnEndReached = () => {
    // fetchPosts(auth.token, {
    //   afterId: oldestPostId
    // })
    // .then(res => res.json())
    // .then(p => {
    //   setPosts(() => posts.concat(p));

    //   if (p.length) {
    //     setOldestPostId(p[p.length - 1].id);
    //   }
    // });
  }

  const handleAddPost = () => {
    setCurrentPost(null);

    navigation.navigate('AddPost', { image });
  }

  const handleOnRefresh = () => {
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
      image={image}
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
        onRefresh={handleOnRefresh}
        onEndReached={handleOnEndReached}
        removeClippedSubviews={true}
        // ListFooterComponentStyle={{flex:1, justifyContent: 'flex-end'}}
        ListFooterComponent={posts.length && <ActivityIndicator size={40} color={'red'} />}
        contentContainerStyle={{flexGrow: 1}}
      />
      <FAB name='add' onPress={handleAddPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Feed;