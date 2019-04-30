import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { Item } from './models/item';
import { User } from './models/user';
import { dateInSeconds } from './util';

const app = express();
const port = 3001;
app.use(json());
app.use(cors());

const users = {
  Bunk: new User('Bunk'),
  Kima: new User('Kima'),
  Herc: new User('Herc')
};


const items: {
  [key: string]: Item
} = {
  'paperclip': new Item('paperclip', 1, dateInSeconds() + 20, users.Bunk),
  'phone': new Item('phone', 9000, dateInSeconds() + 45, users.Kima),
  'air': new Item('air', 20000, dateInSeconds() + 30, users.Herc),
  'sandwich': new Item('sandwich', 499, dateInSeconds() + 27, users.Kima),
  'bubble gum': new Item('bubble gum', 795, dateInSeconds() + 492, users.Kima),
};

app.post('/auctions', (req: Request, res: Response) => {
  const {
    userName,
    itemName,
    price,
    expiry
  } = req.body;

  const newItem = new Item(itemName, price, expiry, userName);

  items[itemName] = newItem;

  res.status(200).send(newItem.getStatus(dateInSeconds()));
});

app.get('/auctions/:name/status', (req: Request, res: Response) => {
  res.status(200).send(items[req.params.name].getStatus(dateInSeconds()));
});

app.get('/auctions', (req: Request, res: Response) => {
  res.status(200).send(Object.values(items).map((item: Item) => item.getStatus(dateInSeconds())));
});

app.put('/auctions/:name/', (req: Request, res: Response) => {
  console.log(`Bid on ${req.params.name}`);
  const item = items[req.params.name];
  if (!item) {
    return res.status(404).send('Item not found');
  }
  const { action, price, bidder } = req.body;
  if (action === 'bid') {
    if (item.setBid(price, users[bidder], dateInSeconds())) {
      return res.status(200).send(item.getStatus(dateInSeconds()));
    }
    res.status(400).send('Unable to set bid');
  }
});

app.listen(port, () => console.log(`Application listening on port ${port}!`));
