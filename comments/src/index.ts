import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(express.json());

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

app.post('/posts/:id/comments', (req, res) => {
  const commentId = uuidv4();
  const content = req.body.content as string;

  const postId = req.params.id;
  const comments = commentsByPostId[postId] ?? [];
  comments.push({
    commentId,
    content,
  });
  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.listen(4001, () => {
  console.log('Comments Service listening on port 4001');
});
