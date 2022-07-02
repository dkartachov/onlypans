export const RATE  = {
  LIKE: 'like',
  DISLIKE: 'dislike',
  NEUTRAL: 'neutral'
};

/**
 * 
 * @param {String} value 'like' or 'dislike' 
 * @param {Object} selfRating Current selfRating state
 * @param {Object} ratings Current total post ratings
 * @returns
 */
export const handleRatings = (value, selfRating, ratings) => {
  if ((selfRating.liked && value === RATE.LIKE) || (selfRating.disliked && value === RATE.DISLIKE)) {
    return {
      rating: RATE.NEUTRAL,
      selfRatingState: {
        liked: false,
        disliked: false
      },
      ratingsState: {
        likes: selfRating.liked ? ratings.likes - 1 : ratings.likes,
        dislikes: selfRating.disliked ? ratings.dislikes - 1 : ratings.dislikes
      },
    }
  }

  const liked = value === RATE.LIKE;
  const prevNeutral = !selfRating.liked && !selfRating.disliked;
  const states = {
    rating: liked ? RATE.LIKE : RATE.DISLIKE,
    selfRatingState: {
      liked: liked,
      disliked: !liked
    },
    ratingsState: {}
  };

  if (prevNeutral) {
    states.ratingsState = {
      likes: liked ? ratings.likes + 1 : ratings.likes,
      dislikes: !liked ? ratings.dislikes + 1 : ratings.dislikes
    };
  } else {
    states.ratingsState = {
      likes: liked ? ratings.likes + 1 : ratings.likes - 1,
      dislikes: !liked ? ratings.dislikes + 1 : ratings.dislikes - 1
    }
  }

  return states;
}