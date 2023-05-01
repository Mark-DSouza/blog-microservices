import axios from 'axios';
import React, { useState } from 'react';

import { type OnSubmitEvent } from './types';

const CommentCreate: React.FC<{ postId: string }> = ({ postId }) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event: OnSubmitEvent) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });
    setContent('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label>Comment</label>
        <input
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className='form-control'
        />
      </div>
      <button>Submit</button>
    </form>
  );
};

export default CommentCreate;
