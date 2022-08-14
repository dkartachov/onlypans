import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Stanza from "./Stanza";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@react-navigation/native";

const SocialButton = ({ name, text, size, color, style, onPress }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name={name} size={size} color={color} />
      </TouchableOpacity>
      {text ? <Stanza style={styles.text}>{text}</Stanza> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginStart: 3
  }
});

export default SocialButton;