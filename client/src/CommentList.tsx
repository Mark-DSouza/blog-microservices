import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

// import { type Comment } from './types';

// const CommentList: React.FC<{ comments: Comment[] }> = ({ comments }) => {
//   const renderedComments = comments.map((comment) => {
//     let content: string;
//     switch (comment.status) {
//       case 'approved':
//         content = comment.content;
//         break;
//       case 'rejected':
//         content = 'This comment has been rejected';
//         break;
//       case 'pending':
//         content = 'This comment is awaiting moderation';
//         break;
//     }
//     return <li key={comment.commentId}>{content}</li>;
//   });

//   return <ul>{renderedComments}</ul>;
// };

const CommentList: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<
    { commentId: string; content: string }[]
  >([]);

  const fetchComments = useCallback(async () => {
    const { data } = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    console.log(data);
    setComments(data);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const renderedComments = comments.map((comment) => (
    <li key={comment.commentId}>{comment.content}</li>
  ));

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
