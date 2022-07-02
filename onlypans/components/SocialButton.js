import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const SocialButton = ({ name, text, size, color, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={size} color={color} />
      </TouchableOpacity>
      {text ? <Text style={styles.text}>{text}</Text> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5
  },
  text: {
    marginStart: 3
  }
});

export default SocialButton;