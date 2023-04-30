import cors from 'cors';
import axios from 'axios';
import express, { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

type Posts = {
  [key: string]: {
    postId: string;
    title: string;
  };
};

const posts: Posts = {};

app.get('/posts', (_, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const postId = uuidv4();
  const title = req.body.title as string;
  posts[postId] = {
    postId,
    title,
  };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        postId,
        title,
      },
    });
  } catch (error) {
    console.error(
      '\n\n\n********************** Start of ERROR in the Posts Service **********************'
    );
    console.error(error);
    console.error(
      '********************** End of ERROR in the Posts Service **********************\n\n\n'
    );
  }

  res.status(201).send(posts[postId]);
});

type CommentCreatedEvent = {
  type: string;
  data: {
    commentId: string;
    content: string;
    postId: string;
  };
};

type PostCreatedEvent = {
  type: string;
  data: {
    postId: string;
    title: string;
  };
};

interface EventRequest extends Request {
  body: CommentCreatedEvent | PostCreatedEvent;
}

app.post('/events', (req: EventRequest, res) => {
  console.log('Event received:', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
