import axios from 'axios';
import React, { useState, useEffect } from 'react';

type Comment = {
  commentId: string;
  content: string;
};

const CommentList: React.FC<{ postId: string }> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(
        `http://localhost:4001/posts/${postId}/comments`
      );
      setComments(data);
    };
    fetchComments();
  }, [postId]);

  const renderedComments = comments.map((comment) => (
    <li key={comment.commentId}>{comment.content}</li>
  ));

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
