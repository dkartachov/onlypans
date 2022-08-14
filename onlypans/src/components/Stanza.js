import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Stanza = ({ style, children }) => {
  const { colors } = useTheme();

  return (
    <Text style={[{ color: colors.text }, style]}>{children}</Text>
  );
}

export default Stanza;