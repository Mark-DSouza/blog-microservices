import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.json());

type Posts = {
  [key: string]: {
    id: string;
    title: string;
  };
};

const posts: Posts = {};

app.get('/posts', (_, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const id = uuidv4();
  const title = req.body.title as string;
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
