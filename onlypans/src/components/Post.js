import { useState, useEffect, useContext, memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import SocialButton from "./SocialButton";
import LikeButton from "./LikeButton";
import { UserContext } from "./Context";
import { like, unlike } from "../api";
import color from "../globals/color";

const Post = ({ post, image, navigate }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const { loginState } = useContext(UserContext);

  console.debug(`re-rendered: ${post.id}`);

  useEffect(() => {
    setLikes(post.likes);
    setLiked(post.liked);
  }, [post])

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
    <TouchableOpacity
      activeOpacity={0.5}
      delayPressIn={20}
      onPress={() => navigate(post.id, image)}
    >
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
              <Text style={styles.username}>{post.user.username}</Text>
            </View>
            <View>
              <Text>{post.content}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row-reverse" }}>
            {/* <SocialButton name={liked ? 'heart' : 'heart-outline'} text={likes} size={20} color={liked ? color.RED : color.BLACK} onPress={onPressLike} /> */}
            <LikeButton liked={liked} likes={likes} onPressLike={onPressLike}/>
            <SocialButton name={'chatbubble-outline'} size={20}/>
          </View>
        </View>
      </View>
      <View style={styles.horizontalLine}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    flexDirection: "row",
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    marginStart: 20,
  },
  user: {
    backgroundColor: 'white',
  },
  username: {
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

export default memo(Post, (prevProps, nextProps) => prevProps.post === nextProps.post);