import express, { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';

import type { CommentCreatedEvent } from '../types';

type Comment = {
  commentId: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

type CommentsByPostId = {
  [postId: string]: Comment[];
};

export const commentsByPostId: CommentsByPostId = {};

const commentsRouter = express.Router();

interface CreateCommentRequest extends Request {
  params: {
    id: string;
  };
  body: {
    commentId: string;
    content: string;
  };
}
commentsRouter
  .route('/posts/:id/comments')
  .get((req, res) => {
    res.send(commentsByPostId[req.params.id] ?? []);
  })
  .post(async (req: CreateCommentRequest, res) => {
    const commentId = uuidv4();
    const { content } = req.body;

    const postId = req.params.id;
    console.log('postId: ', postId);
    const comments = commentsByPostId[postId] ?? [];
    comments.push({
      commentId,
      content,
      status: 'pending',
    });
    commentsByPostId[postId] = comments;

    try {
      await axios.post<
        any,
        AxiosResponse<any, CommentCreatedEvent>,
        CommentCreatedEvent
      >('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
          commentId,
          content,
          postId,
          status: 'pending',
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

export { commentsRouter };
