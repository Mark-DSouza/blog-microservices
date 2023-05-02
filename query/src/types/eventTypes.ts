import { Request } from "express";

export type CommentCreatedEvent = {
  type: 'CommentCreated';
  data: {
    commentId: string;
    content: string;
    postId: string;
    status: 'pending';
  };
};

export type CommentUpdatedEvent = {
  type: 'CommentUpdated';
  data: {
    commentId: string;
    content: string;
    postId: string;
    status: 'approved' | 'rejected';
  };
};

export type PostCreatedEvent = {
  type: 'PostCreated';
  data: {
    postId: string;
    title: string;
  };
};

export type ModerationCompletedEvent = {
  type: 'ModerationCompleted';
  data: {
    commentId: string;
    content: string;
    postId: string;
    status: 'approved' | 'rejected';
  };
};

export interface EventRequest extends Request {
  body:
    | CommentCreatedEvent
    | PostCreatedEvent
    | ModerationCompletedEvent
    | CommentUpdatedEvent;
}