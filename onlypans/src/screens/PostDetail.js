import { useState, useEffect } from "react";
import { View, Image, StyleSheet, FlatList } from "react-native";
import SocialButton from "../components/SocialButton";
import LikeButton from "../components/LikeButton";
import Comment from "../components/Comment";
import Stanza from "../components/Stanza";
import { useAuth } from "../context/AuthProvider";
import { refreshPost, like, unlike } from "../api";

const PostDetail = ({ route, navigation }) => {
  const { post, image } = route.params;
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    console.log('Updating detailed post...');

    // change to pull more data like comments
    refreshPost(auth.accessToken, post.id)
    .then(res => res.json())
    .then(post => {
      setLiked(post.liked);
      setLikes(post.likes);
      setComments([
        {
          id: 1,
          content: 'Junkrat is overrated lol',
          user: {
            username: 'dumbfuck'
          }
        },
        {
          id: 2,
          content: 'Nice! I main Roadhog',
          user:  {
            username: 'someguy'
          }
        },
        {
          id: 3,
          content: 'What do you think about Overwatch 2? Cause you won\' be able to play Overwatch soon...',
          user: {
            username: 'motherfucker'
          }
        }
      ])
    })
    .then(() => console.log('Updated detailed post.'))
    .catch(error => console.log('Error pulling post data', error))
  }, []);

  const onPressLike = async () => {
    const prevLike = liked;

    setLiked(() => !liked);

    let user = {
      userId: auth.userId,
      accessToken: auth.accessToken
    };
    
    const res = prevLike ? await unlike(user, post.id) : await like(user, post.id);

    if (res.status !== 200) {
      setLiked(prevLike);

      return;
    }

    const newLikes = prevLike ? likes - 1 : likes + 1;

    setLikes(newLikes);
  }
  
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.post}>
          <Image
            source={{
              uri: image
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50/2,
            }}
          />
          <View style={styles.content}>
            <View style={styles.user}>
              <View style={{ marginBottom: 5 }}>
                <Stanza style={styles.username}>{post.user.username}</Stanza>
              </View>
              <View>
                <Stanza>{post.content}</Stanza>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.horizontalLine}/>
        <View style={styles.metadata}>
          <Stanza>0 comments</Stanza>
          <Stanza>{`${likes} likes`}</Stanza>
        </View>
        <View style={styles.horizontalLine}/>
        <View style={styles.buttons}>
          <SocialButton name={'chatbubble-outline'} size={22}/>
          <LikeButton liked={liked} onPressLike={onPressLike}/>
        </View>
        <View style={styles.horizontalLine}/>
      </View>
      <FlatList 
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Comment comment={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  post: {
    flexDirection: "row",
    padding: 20
  },
  content: {
    flex: 1,
    marginStart: 20,
  },
  user: {
    // backgroundColor: 'white',
  },
  username: {
    fontWeight: 'bold'
  },
  rating: {
    textAlignVertical: 'center'
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 3
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 3
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default PostDetail;