import express from 'express';
import axios, { AxiosResponse } from 'axios';

import { commentsByPostId } from './commentsRouter';

import type { CommentUpdatedEvent, EventRequest } from '../types';

const eventsRouter = express.Router();

eventsRouter.post('/', async (req: EventRequest, res) => {
  const { type, data } = req.body;
  if (type === 'ModerationCompleted') {
    const { commentId, content, postId, status } = data;
    const comment = commentsByPostId[postId].find(
      (comment) => comment.commentId === commentId
    );
    if (comment) {
      comment.content = content;
      comment.status = status;

      try {
        await axios.post<
          any,
          AxiosResponse<any, CommentUpdatedEvent>,
          CommentUpdatedEvent
        >('http://localhost:4005/events', {
          type: 'CommentUpdated',
          data: {
            commentId,
            content,
            postId,
            status,
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
    }
  }
  res.send({});
});

export { eventsRouter };
