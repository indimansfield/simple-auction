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

/* Hardcoded Users*/
const users = {
  Omar: new User('Omar'),
  Kima: new User('Kima'),
  Herc: new User('Herc')
};

// Time to expiry in seconds, adjust for longer or shorter auction durations
const paperclipExpiry = 30;
const phoneExpiry = 45;
const airExpiry = 34;
const sandwichExpiry = 67;
const bubblegumExpiry = 492;

// Hardcoded itemss to place bids on
const items: {
  [key: string]: Item
} = {
  'Paperclip': new Item('Paperclip', 1, dateInSeconds() + paperclipExpiry, users.Omar),
  'Phone': new Item('Phone', 9000, dateInSeconds() + phoneExpiry, users.Kima),
  'Air': new Item('Air', 20000, dateInSeconds() + airExpiry, users.Herc),
  'Sandwich': new Item('Sandwich', 499, dateInSeconds() + sandwichExpiry, users.Kima),
  'Bubble gum': new Item('Bubble gum', 795, dateInSeconds() + bubblegumExpiry, users.Kima),
};


// App routes
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
