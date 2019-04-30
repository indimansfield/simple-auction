import express, { Request, Response } from 'express';
import { json } from 'body-parser';
const app = express();
const port = 3000;

app.use(json());
let count = 0;
app.get('/', (req: Request, res: Response) => {
  count ++;
  res.json({
    count
  });
});

app.listen(port, () => console.log(`Application listening on port ${port}!`))