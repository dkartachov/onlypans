import { useState, useEffect, memo } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Stanza from "./Stanza";
import { useTheme } from "@react-navigation/native";
import SocialButton from "./SocialButton";
import LikeButton from "./LikeButton";
import { useAuth } from "../context/AuthProvider";
import { like, unlike } from "../api";

const Post = ({ post, image, navigate }) => {
  const { colors } = useTheme();
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const { auth } = useAuth();

  console.debug(`re-rendered: ${post.id}`);

  useEffect(() => {
    setLikes(post.likes);
    setLiked(post.liked);
  }, [post])

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
              <Stanza style={styles.username}>{post.user.username}</Stanza>
            </View>
            <View>
              <Stanza>{post.content}</Stanza>
            </View>
          </View>
          <View style={{ flexDirection: "row-reverse" }}>
            <LikeButton liked={liked} likes={likes} onPressLike={onPressLike}/>
            <SocialButton name={'chatbubble-outline'} size={22}/>
          </View>
        </View>
      </View>
      <View style={styles.horizontalLine}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
    margin: 5
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
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default memo(Post, (prevProps, nextProps) => prevProps.post === nextProps.post);