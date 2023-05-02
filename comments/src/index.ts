import cors from 'cors';
import express from 'express';

import { commentsRouter, eventsRouter } from './routers';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/', commentsRouter);
app.use('/events', eventsRouter);

app.listen(4001, () => {
  console.log('Comments Service listening on port 4001');
});
