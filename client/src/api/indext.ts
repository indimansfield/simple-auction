import axios from 'axios';

const client = axios.create({
  baseURL: '127.0.0.1:3000',
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export const getCount = async () => {
  const result = await client.get('/');
  return result.data;
};
