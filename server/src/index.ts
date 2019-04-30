import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { Item } from './models/item';
import { User } from './models/user';
import { dateInSeconds } from './util';

const app = express();
const port = 3001;
app.use(json());

const users = {
  bunk: new User('bunk'),
  kima: new User('kima'),
  herc: new User('herc')
};

const items: {
  [key: string]: Item
} = {
  'paperclip': new Item('paperclip', 1, dateInSeconds() + 600, users.bunk),
  'phone': new Item('phone', 9000, dateInSeconds() + 3000, users.kima),
  'air': new Item('air', 20000, dateInSeconds() + 90, users.herc),
  'sandwich': new Item('sandwich', 499, dateInSeconds() + 975, users.kima),
  'bubble gum': new Item('bubble gum', 795, dateInSeconds() + 3000, users.kima),
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
  res.status(200).send(Object.values(items).map((item: Item) => item.getStatus(122)));
});

app.put('/auctions/:name/', (req: Request, res: Response) => {
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
