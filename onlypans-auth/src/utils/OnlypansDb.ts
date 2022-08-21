import axios from 'axios';

export interface User {
  username: string,
  password: string
};

export const getUser = async (username: string) => {
  try {
    const { data, status } = await axios.get<User>(process.env.ONLYPANS_DB_URL ?? '', {
      headers: {
        'Accept': 'application/json'
      }
    });

    return data;
  } catch (error) {
    console.log(error);

    return null;
  }
}
