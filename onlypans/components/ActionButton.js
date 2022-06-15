import { View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const ActionButton = ({ name, size, color, style, onPress }) => {
  return (
    <View style={[style, { alignItems: 'flex-start', padding: 5 }]}>
      <TouchableOpacity
        onPress={onPress}
      >
        <Ionicons name={name} size={size} color={color} />
      </TouchableOpacity>
    </View>
  );
}

export default ActionButton;