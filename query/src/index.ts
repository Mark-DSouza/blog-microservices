import cors from 'cors';
import express from 'express';
import type { EventRequest } from './types';

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

type Posts = {
  [key: string]: Post;
};

const posts: Posts = {};

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
    const { commentId, content, postId, status } = data;
    console.log('postId: ', postId);
    console.log('Post[postId]: ', posts[postId]);
    console.log('comments of that: ', posts[postId].comments);
    posts[postId].comments.push({ commentId, content, status });
  }

  if (type === 'CommentUpdated') {
    const { commentId, content, postId, status } = data;
    const comment = posts[postId].comments.find(
      (comment) => comment.commentId === commentId
    );

    if (comment) {
      comment.content = content;
      comment.status = status;
    }
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
