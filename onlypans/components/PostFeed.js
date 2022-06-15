import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Post from "./Post";

const PostFeed = ({ post, image, onPress, onVotePost }) => {
  return (
  <TouchableOpacity
    activeOpacity={0.5}
    delayPressIn={20}
    onPress={() => onPress(post, image)}
  >
    <Post post={post} image={image} onVotePost={onVotePost} />
    <View style={styles.horizontalLine}/>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default PostFeed;