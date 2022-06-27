import { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ActionButton from "./ActionButton";
import env from "../env";
import { UserContext } from "./Context";

const COLOR = {
  GREEN: 'green',
  RED: 'red',
  BLACK: 'black',
};

const RATE  = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  NEUTRAL: 'neutral'
};

const Post = ({ post, image }) => {
  const [rating, setRating] = useState({});
  const { loginState } = useContext(UserContext);

  useEffect(() => (
    setRating({
      liked: post.rating.liked,
      disliked: post.rating.disliked
    })
  ), []);

  const updateRating = async (payload, prevRating) => {
    payload.id = post.id;

    const res = await fetch(`${env.ONLYPANS_API_URL}/api/v1/users/${loginState.userId}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginState.accessToken}`
      },
      body: JSON.stringify(payload)
    });

    if (res.status !== 200) {
      setRating(prevRating);
    }
  }

  const handleRating = (value) => {
    const prevRating = { ...rating };

    if ((rating.liked && value === RATE.LIKE) || (rating.disliked && value === RATE.DISLIKE)) {
      setRating({
        liked: false,
        disliked: false
      });

      updateRating({ rating: 'neutral' }, prevRating);

      return;
    }

    const liked = value === RATE.LIKE;

    setRating({
      liked: liked,
      disliked: !liked
    });

    liked ? updateRating({ rating: 'like' }, prevRating) : updateRating({ rating: 'dislike' }, prevRating);
  }

  return (
    <View style={styles.postContainer}>
      <Image
        source={{
          uri: image
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 60/2,
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
          <ActionButton name={"arrow-down"} size={20} color={rating.disliked ? COLOR.RED : COLOR.BLACK} onPress={() => handleRating(RATE.DISLIKE)} />
          <ActionButton name={"arrow-up"} size={20} color={rating.liked ? COLOR.GREEN : COLOR.BLACK} onPress={() => handleRating(RATE.LIKE)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    flexDirection: "row",
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginStart: 20,
  },
  userBodyContainer: {
    backgroundColor: 'white',
  },
  username: {
    color: 'black',
    fontWeight: "bold",
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default Post;