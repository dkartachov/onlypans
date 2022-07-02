import { useState, useEffect, useLayoutEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import SocialButton from "../components/SocialButton";
import LikeButton from "../components/LikeButton";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RATE, handleRatings } from "../components/Utils";
import color from "../globals/color";
import { UserContext } from "../components/Context";
import { refreshPost, like, unlike } from "../api";

const PostDetail = ({ route, navigation }) => {
  const { post, image } = route.params;
  const [liked, setLiked] = useState();
  const [likes, setLikes] = useState();
  const { loginState } = useContext(UserContext);

  useEffect(() => {
    console.log('Updating detailed post...');

    refreshPost(loginState.accessToken, post.id)
    .then(res => res.json())
    .then(post => {
      setLiked(post.liked);
      setLikes(post.likes);
    })
    .then(() => console.log('Updated detailed post.'))
    .catch(error => console.log('Error pulling post data', error))
  }, []);

  const onPressLike = async () => {
    const prevLike = liked;

    setLiked(() => !liked);

    let user = {
      userId: loginState.userId,
      accessToken: loginState.accessToken
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
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image 
          source={{
            uri: image
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 50/2
          }}
        />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{post.content}</Text>
      </View>
        
        
        {/* <Image
          source={{
            uri: image
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40/2,
          }}
        />
        <View style={styles.contentContainer}>
          <View style={styles.userBodyContainer}>
            <View style={{ marginBottom: 5 }}>
              <Text style={styles.username}>{post.user.username}</Text>
            </View>
            <View>
              <Text>{post.content}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row-reverse" }}>
            <LikeButton liked={liked} likes={likes} onPressLike={onPressLike}/>
            <SocialButton name={'chatbubble-outline'} size={20}/>
          </View>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: 'white',
    padding: 10
  },
  postHeader: {
    flexDirection: 'row'
  },
  contentContainer: {
    padding: 10
  },
  userBodyContainer: {
    backgroundColor: 'white',
  },
  username: {
    marginStart: 10,
    marginTop: 5,
    color: 'black',
    fontWeight: "bold"
  },
  rating: {
    textAlignVertical: 'center'
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default PostDetail;