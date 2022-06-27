const Post = (record) => ({
  id: record.post_id,
  content: record.content,
  mediaUrl: record.media_url,
  likes: record.likes,
  dislikes: record.dislikes,
  date: record.posted_date,
  user: {
    id: record.user_id,
    username: record.username,
  },
  rating: {
    liked: record.liked,
    disliked: record.disliked
  }
})

export default Post;