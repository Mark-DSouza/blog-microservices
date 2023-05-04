import axios from 'axios';
import cors from 'cors';
import express from 'express';

import { handleEvents } from './handleEvents';

import type { Event, EventRequest } from './types';

const app = express();
app.use(express.json());
app.use(cors());

type Comment = {
  commentId: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

type Post = {
  postId: string;
  title: string;
  comments: Comment[];
};

export type Posts = {
  [key: string]: Post;
};

const posts: Posts = {};

app.post('/events', (req: EventRequest, res) => {
  handleEvents(posts, req.body);
  console.log(posts);
  res.status(201).send({});
});

app.get('/posts', (_, res) => {
  res.send(posts);
});

app.listen(4002, async () => {
  console.log('Query Service is running on port 4002');

  try {
    const { data: events } = await axios.get<Event[]>(
      'http://localhost:4005/events'
    );

    for (const event of events) {
      console.log('Processing event: ', event.type);
      handleEvents(posts, event);
    }
  } catch (error) {
    console.error(error);
  }
});
