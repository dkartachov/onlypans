import { useState, useEffect, useContext, useMemo } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import PostFeed from '../components/PostFeed';
import env from '../env';
import { UserContext } from '../components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const renderItem = ({ item }) => (
  <PostFeed 
    post={item}
    image={"https://picsum.photos/1920/1080"}
    onVotePost={onVotePost}
  />
)

const onVotePost = (id, vote) => {
  console.log(`post id ${id} vote: ${vote}`);
}

const Feed = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(15);

  const { logout } = useContext(UserContext);

  useEffect(() => {
    console.log('fetching posts...');

    fetch(`${env.ONLYPANS_API_URL}/posts`, {
      method: 'GET',
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
    // fetch more posts
    const morePosts = [...posts,
      {
        id: index,
        username: '@spongebob',
        body: 'Who lives in a pineapple under the sea?',
        vote: 'up'
      },
      {
        id: index + 1,
        username: '@patrick',
        body: 'Spongebob squarepants!',
        vote: 'up'
      },
      {
        id: index + 2,
        username: '@plankton',
        body: 'No it\s not',
        vote: 'up'
      },
      {
        id: index + 3,
        username: '@plankton',
        body: 'the recipe is mine muahahaa',
        vote: 'down'
      },
    ];

    let newIndex = index + 4;

    setPosts(morePosts);
    setIndex(index + 4);
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