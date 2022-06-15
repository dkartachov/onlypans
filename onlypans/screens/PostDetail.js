import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Post from "../components/Post";

const PostDetail = ({ route }) => {
  const { post, image } = route.params;

  return (
    <View style={styles.container}>
      <Post post={post} image={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  }
});

export default PostDetail;