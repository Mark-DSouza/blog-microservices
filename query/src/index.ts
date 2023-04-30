import cors from 'cors';
import express, { Request } from 'express';

const app = express();
app.use(express.json());
app.use(cors());

type Posts = {
  [key: string]: {
    postId: string;
    title: string;
    comments: {
      commentId: string;
      content: string;
    }[];
  };
};

const posts: Posts = {};

type CommentCreatedEvent = {
  type: 'CommentCreated';
  data: {
    commentId: string;
    content: string;
    postId: string;
  };
};

type PostCreatedEvent = {
  type: 'PostCreated';
  data: {
    postId: string;
    title: string;
  };
};

interface EventRequest extends Request {
  body: CommentCreatedEvent | PostCreatedEvent;
}

app.post('/events', (req: EventRequest, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { postId, title } = data;
    posts[postId] = {
      postId,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { commentId, content, postId } = data;
    posts[postId].comments.push({ commentId, content });
  }

  console.log(posts);
  res.status(201).send({});
});

app.get('/posts', (_, res) => {
  res.send(posts);
});

app.listen(4002, () => {
  console.log('Query Service is running on port 4002');
});
