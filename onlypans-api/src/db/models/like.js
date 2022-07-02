const Like = (record) => ({
  id: record.like_id,
  user: {
    id: record.user_id,
    username: record.username
  },
  post: {
    id: record.post_id,
    content: record.content,
    mediaUrl: record.media_url,
    date: record.posted_date,
    likes: record.likes
  }
})

export default Like;