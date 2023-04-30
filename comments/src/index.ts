import axios from 'axios';
import cors from 'cors';
import express, { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());
app.use(cors());

type CommentsByPostId = {
  [postId: string]: {
    commentId: string;
    content: string;
  }[];
};

const commentsByPostId: CommentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] ?? []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = uuidv4();
  const content = req.body.content as string;

  const postId = req.params.id;
  const comments = commentsByPostId[postId] ?? [];
  comments.push({
    commentId,
    content,
  });
  commentsByPostId[postId] = comments;

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        commentId,
        content,
        postId,
      },
    });
  } catch (error) {
    console.error(
      '\n\n\n********************** Start of ERROR in the Comments Service **********************'
    );
    console.error(error);
    console.error(
      '********************** End of ERROR in the Comments Service **********************\n\n\n'
    );
  }

  res.status(201).send(comments);
});

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
  console.log('Event received:', req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log('Comments Service listening on port 4001');
});
