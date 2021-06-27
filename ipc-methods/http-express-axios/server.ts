import * as express from 'express';
import type { TMockData } from 'ipc-benchmark-testing-types';
import { TheOperation } from '../../shared/TheOperation';

const app = express();
// Currently the largest mock data is only around 770K
app.use(express.json({ limit: '10mb' }));

app.post('/', (req, res) => {
  const rawData = req.body as TMockData[];

  res.json(TheOperation(rawData));
});

app.get('/', (req, res) => {
  console.log('My work here is done');
  res.sendStatus(200);
  process.exit(0);
});

app.listen(3000, () => {
  console.log('Express listening on localhost:3000');
});
