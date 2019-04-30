import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

export const getAuctions = async () => {
  const result = await client.get('/auctions');
  return result.data;
};

export const bid = async (itemName: string, price: number, bidder: string) => {
  const result = await client.put(
    `/auctions/${itemName}`, {
      action: 'bid',
      price,
      bidder,
    });
  return result.data;
};

export const getItemStatus = async (name: string) => {
  const result = await client.get(`/auctions/${name}/status`);
  return result.data;
};

