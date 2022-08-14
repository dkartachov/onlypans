import { TextInput } from 'react-native';
import { forwardRef } from 'react';
import { useTheme } from '@react-navigation/native';

const StanzaInput = forwardRef((props, ref) => {
  const { colors } = useTheme();

  return (
    <TextInput
      ref={ref}
      multiline={props.multiline}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      placeholderTextColor={colors.textPlaceholder}
      style={[{ color: colors.text }, props.style]}
    />
  );
})

export default StanzaInput;