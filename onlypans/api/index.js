import env from "../env";

/**
 * Fetch latest posts
 * @param {String} accessToken 
 * @returns Array of posts
 */
 export const fetchLatestPosts = async (accessToken) => (
  fetch(`${env.ONLYPANS_API_URL}/api/v1/posts`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
)

/**
 * Retrieve latest post data by id
 * @param {String} accessToken 
 * @param {Number} id 
 * @returns Post
 */
export const refreshPost = async (accessToken, id) => (
  fetch(`${env.ONLYPANS_API_URL}/api/v1/posts/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
)

/**
 * Like post on behalf of a user
 * @param {Object} user
 * @param {String} user.userId
 * @param {String} user.accessToken 
 * @param {Number} id
 * @returns 
 */
 export const like = async (user, id) => (
  fetch(`${env.ONLYPANS_API_URL}/api/v1/users/${user.userId}/likes`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.accessToken}`
    },
    body: JSON.stringify({ id })
  })
)

/**
 * Unlike post on behalf of a user
 * @param {Object} user
 * @param {String} user.userId
 * @param {String} user.accessToken 
 * @param {Number} id
 * @returns 
 */
export const unlike = async (user, id) => (
  fetch(`${env.ONLYPANS_API_URL}/api/v1/users/${user.userId}/likes/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.accessToken}`
    }
  })
)