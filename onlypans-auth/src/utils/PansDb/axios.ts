import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.DB_URL!
});

export default instance;