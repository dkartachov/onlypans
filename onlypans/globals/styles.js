import { StyleSheet } from 'react-native';

export const post = StyleSheet.create({
  post: {
    flexDirection: 'row',
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