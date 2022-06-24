import { useState, useEffect, memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ActionButton from "./ActionButton";
import env from "../env";

const colors = {
  green: 'green',
  red: 'red',
  black: 'black',
};

const Post = ({ post, image }) => {
  const [vote, setVote] = useState(post.vote || null);

  const updateVote = async (vote) => {
    const res = await fetch(`${env.ONLYPANS_API_URL}/posts/${post.id}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vote,
      }),
    });

    if (res.status !== 200) {
      console.error(`Error updating vote for post ${post.id}`);
    }
  }

  const onVotePost = (id, vote) => {
    console.log(`post id ${id} vote: ${vote}`);
  }

  const handleVote = (value) => {
    if ((vote === 'up' && value === 'up') || (vote === 'down' && value === 'down')) {
      onVotePost(post.id, null);
      setVote(null);
      updateVote('');

      return;
    }

    onVotePost(post.id, value);
    setVote(value);
    updateVote(value);
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
            <Text style={styles.username}>{post.username}</Text>
          </View>
          <View>
            <Text>{post.body}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row-reverse" }}>
          <ActionButton name={"arrow-down"} size={20} color={vote === 'down' ? colors.red : colors.black} onPress={() => handleVote('down')} />
          <ActionButton name={"arrow-up"} size={20} color={vote === 'up' ? colors.green : colors.black} onPress={() => handleVote('up')} />
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