import { memo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Post from "./Post";
import { useNavigation } from '@react-navigation/native';

const PostFeed = ({ post, image, onPress, onVotePost }) => {

  const navigation = useNavigation();

  const handleOnPress = () => navigation.navigate('PostDetail', { post, image });

  return (
  <TouchableOpacity
    activeOpacity={0.5}
    delayPressIn={20}
    onPress={handleOnPress}
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

export default memo(PostFeed);