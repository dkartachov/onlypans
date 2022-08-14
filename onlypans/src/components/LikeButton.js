import SocialButton from "./SocialButton";
import color from "../globals/color";
import { useTheme } from '@react-navigation/native';

const LikeButton = ({ liked, likes, onPressLike, style }) => {
  const { colors } = useTheme();

  return (
    <SocialButton 
      name={liked ? 'heart' : 'heart-outline'}
      text={likes} 
      size={26} 
      color={liked ? color.RED : color.BLACK}
      onPress={onPressLike} 
      style={style}
    />
  );
}

export default LikeButton;