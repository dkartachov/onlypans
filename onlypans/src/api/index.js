import env from "../env";

/**
 * Fetch latest posts
 * @param {String} accessToken
 * @param {Object} options
 * @param {Number} options.timeout Time before request times out (ms)
 * @param {Number} options.afterId Fetch posts after this post id
 * @param {Number} options.limit How many posts to fetch, API defaults to 10
 * @returns Array of posts
 */
 export const fetchPosts = async (accessToken, options = {}) => {
  const { timeout = 5000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  let query = `limit=${options.limit || 10}`;
  query += options.afterId ? `&afterId=${options.afterId}` : '';

  const url = `${env.ONLYPANS_API_URL}/api/v1/posts${query ? `?${query}` : ''}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    signal: controller.signal,
  });

  clearTimeout(id);

  return res;
}


/**
 * Fetch older posts
 * @param {String} accessToken 
 * @param {Object} options
 * @param {Number} options.oldestPostId
 * @param {Number?} options.amount
 */
export const fetchOlderPosts = async (accessToken, options = {}) => {
  const { oldestPostId, amount } = options;

  
}

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

/**
 * Add post on behalf of a user
 * @param {Object} user
 * @param {String} user.userId
 * @param {String} user.accessToken 
 * @param {Number} id 
 * @returns
 */
export const addPost = async (user, body) => (
  fetch(`${env.ONLYPANS_API_URL}/api/v1/users/${user.userId}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.accessToken}`
    },
    body: JSON.stringify(body)
  })
)