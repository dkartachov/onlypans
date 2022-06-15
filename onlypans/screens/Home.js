import { useState } from 'react';
import { StyleSheet, SafeAreaView, View, StatusBar, FlatList } from 'react-native';
import Post from '../components/Post';
import PostFeed from '../components/PostFeed';

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: '@deniskartachov',
      body: 'This is the best social media app ever! Get it now!',
      vote: 'up',
    },
    {
      id: 2,
      username: '@charlietheborzoi',
      body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
      vote: 'up',
    },
    {
      id: 3,
      username: '@pennywise',
      body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
      vote: 'down',
    },
    {
      id: 4,
      username: '@deniskartachov',
      body: 'This is the best social media app ever! Get it now!',
    },
    {
      id: 5,
      username: '@charlietheborzoi',
      body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
      vote: 'up',
    },
    {
      id: 6,
      username: '@pennywise',
      body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
    },
    {
      id: 7,
      username: '@deniskartachov',
      body: 'This is the best social media app ever! Get it now!',
    },
    {
      id: 8,
      username: '@charlietheborzoi',
      body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
    },
    {
      id: 9,
      username: '@pennywise',
      body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
      vote: 'down',
    },
    {
      id: 10,
      username: '@pennywise',
      body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
    },
    {
      id: 11,
      username: '@deniskartachov',
      body: 'This is the best social media app ever! Get it now!',
    },
    {
      id: 12,
      username: '@charlietheborzoi',
      body: 'Woof woof. Woof woof woof! Woof... Woof woof? Woof!',
    },
    {
      id: 13,
      username: '@pennywise',
      body: 'Some kid got lost and wandered in my sewer, name\'s Georgie. Trying to comfort him with balloons but he keeps crying. Kids huh?',
    }
  ]);
  const [id, setId] = useState(14);

  const addPost = () => {
    let nextId = id + 1;
    setId(nextId);
    posts.unshift({id, username: '@marmar', body: 'Hey guys its marmar! How are you doing?'});

    setPosts(() => posts);
  }

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
      addPost();
    }, 50);
  }

  const onPressPost = (post, image) => {
    navigation.navigate('PostDetail', { post, image });
  }

  const onVotePost = (id, vote) => {
    console.log(`post id ${id} vote: ${vote}`);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostFeed post={item} image={"https://picsum.photos/1920/1080"} onPress={onPressPost} onVotePost={onVotePost} />}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Home;