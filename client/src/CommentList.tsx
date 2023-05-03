import React from 'react';

import { type Comment } from './types';

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content: string;
    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'rejected':
        content = 'This comment has been rejected';
        break;
      case 'pending':
        content = 'This comment is awaiting moderation';
        break;
    }
    return <li key={comment.commentId}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
