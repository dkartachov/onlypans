import axios from './axios';

export interface Payload {
  query: string,
  method?: 'oneOrNone' | 'all',
  params?: any[]
}

export const Query = async (payload: Payload) => {
  try {
    const { data } = await axios.post('/query', payload);

    return data;
  } catch (error) {
    console.log(error);
  }
}
