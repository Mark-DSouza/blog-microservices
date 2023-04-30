import React from 'react';

import { Comment } from './types';

const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
  const renderedComments = comments.map((comment) => (
    <li key={comment.commentId}>{comment.content}</li>
  ));

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
