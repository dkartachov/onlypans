import { View, Image, TextInput, StyleSheet } from 'react-native';
import { useState, useEffect, useRef, createRef } from 'react';
import StanzaInput from '../components/StanzaInput';
import FAB from '../components/FAB';
import { addPost } from '../api';
import { useAuth } from '../context/AuthProvider';

const delayFocusTime = 200;

const AddPost = ({ navigation, route }) => {
  const [text, setText] = useState();
  const inputRef = createRef();
  const { auth } = useAuth();

  const { image } = route?.params;

  useEffect(() => {
    const delayFocus = setTimeout(() => {
      inputRef.current.focus();
    }, delayFocusTime);

    return () => {
      clearTimeout(delayFocus);
    }
  }, []);

  const handleAddPost = async () => {
    const user = {
      userId: auth.userId,
      accessToken: auth.token
    };
    const body = {
      post: {
        content: text,
      }
    };

    console.log(user);
    console.log(body);

    addPost(user, body)
    .then(() => navigation.goBack())
    .catch(error => console.debug(error));
  }

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
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
        <StanzaInput
          ref={inputRef}
          multiline={true}
          placeholder={'What\s panning?'}
          onChangeText={text => setText(text)}
          style={styles.textInput}
        />
      </View>
      <FAB name='send' disabled={!text} onPress={handleAddPost}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    flexDirection: 'row',
    // backgroundColor: 'blue',
  },
  textInput: {
    flex: 1,
    textAlignVertical: 'top',
    marginHorizontal: 20,
    marginTop: 20,
    // backgroundColor: 'red',
  },
  fab: {
    position: 'absolute',
  }
});

export default AddPost;