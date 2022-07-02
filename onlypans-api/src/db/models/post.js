const Post = (record) => ({
  id: record.post_id,
  content: record.content,
  mediaUrl: record.media_url,
  likes: record.likes,
  liked: record.like_id ? true : false,
  date: record.posted_date,
  user: {
    id: record.user_id,
    username: record.username,
  }
})

export default Post;