import axios from './axios';

export interface Payload {
  query: string,
  method?: 'any' | 'none' | 'oneOrNone',
  params?: any[]
}

export const Query = async <T>(payload: Payload): Promise<T | undefined> => {
  try {
    const { data } = await axios.post('/query', payload);

    return data;
  } catch (error) {
    console.log(error);
  }
}
