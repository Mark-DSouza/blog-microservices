import axios from 'axios';
import { useState } from 'react';

import { OnSubmitEvent } from './types';

const PostCreate = () => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event: OnSubmitEvent) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title,
    });
    setTitle('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label>Title</label>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className='form-control'
        />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  );
};

export default PostCreate;
