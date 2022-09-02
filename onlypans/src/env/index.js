const env = {
  API_URL: __DEV__ ? 'http://192.168.1.97:3000' : 'prod_url',
  AUTH_URL: __DEV__ ? 'http://192.168.1.97:3002' : 'prod_url'
};

export default env;