export default interface Post {
  id?: number,
  userId?: number,
  username: string,
  content: string,
  likes: number,
  liked?: boolean,
  comments: number
}