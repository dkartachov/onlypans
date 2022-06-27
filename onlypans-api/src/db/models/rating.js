const Rating = (record) => ({
  id: record.rating_id,
  liked: record.liked,
  disliked: record.disliked,
  user: {
    id: record.user_id,
    username: record.username
  },
  post: {
    id: record.post_id,
    content: record.content,
    mediaUrl: record.media_url,
    date: record.posted_date,
    likes: record.likes,
    dislikes: record.dislikes
  }
})

export default Rating;