import { View, Image, StyleSheet } from 'react-native';
import Stanza from './Stanza';

const Comment = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{
          uri: 'https://picsum.photos/1920/1080',
          width: 50,
          height: 50
        }}
        style={{
          borderRadius: 50/2
        }}
      />
      <View style={styles.content}>
        <Stanza style={styles.username}>{comment.user.username}</Stanza>
        <Stanza style={styles.text}>{comment.content}</Stanza>
      </View>
      <View style={styles.horizontalLine}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 5,
    minHeight: 50
  },
  content: {
    flex: 1,
    backgroundColor: 'red',
    marginHorizontal: 20
  },
  username: {
    fontWeight: 'bold',
  },
  text: {
    marginTop: 5,
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default Comment;