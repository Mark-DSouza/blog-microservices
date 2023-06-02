import axios from 'axios';
import { useState, useEffect } from 'react';

// import CommentCreate from './CommentCreate';
// import CommentList from './CommentList';

// import { type Comment } from './types';

type Posts = {
  [key: string]: {
    postId: string;
    title: string;
    // comments: Comment[];
  };
};

const PostList = () => {
  const [posts, setPosts] = useState<Posts>({});

  const fetchPosts = async () => {
    // const { data } = await axios.get('http://localhost:4002/posts');
    const { data } = await axios.get('http://localhost:4000/posts');
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    const { postId, title /*comments*/ } = post;
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={postId}
      >
        <div className='card-body'>
          <h3>{title}</h3>
          {/* <CommentList comments={comments} /> */}
          {/* <CommentCreate postId={postId} /> */}
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
