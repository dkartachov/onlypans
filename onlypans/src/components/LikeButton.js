import SocialButton from "./SocialButton";
import color from "../globals/color";

const LikeButton = ({ liked, likes, onPressLike, style }) => {
  return (
    <SocialButton 
      name={liked ? 'heart' : 'heart-outline'}
      text={likes} 
      size={20} 
      color={liked ? color.RED : color.BLACK} 
      onPress={onPressLike} 
      style={style}
    />
  );
}

export default LikeButton;