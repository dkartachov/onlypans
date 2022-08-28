import axios from './axios';

export interface Payload {
  query: string,
  method?: 'any' | 'none' | 'oneOrNone',
  params?: any[]
}

export const Query = async <T = any>(payload: Payload): Promise<T | null> => {
  try {
    const { data } = await axios.post<T>('/query', payload);

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
}
