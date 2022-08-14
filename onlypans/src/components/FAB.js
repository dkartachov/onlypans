import { StyleSheet, TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const buttonSize = 50;
const iconSize = 24;

const FAB = ({ name, onPress, disabled }) => {
  const { colors } = useTheme();

  return (
    <TouchableHighlight
      disabled={disabled}
      underlayColor={colors.background}
      onPress={onPress}
      style={[styles.fab, {
        backgroundColor: disabled ? colors.primaryDisabled : colors.primary
      }]}
    >
      <MaterialIcons
        name={name} 
        size={iconSize}
      />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginEnd: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize,
  }
});

export default FAB;