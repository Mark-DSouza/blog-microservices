import axios from 'axios';
import { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

type Posts = {
  [key: string]: {
    postId: string;
    title: string;
  };
};

const PostList = () => {
  const [posts, setPosts] = useState<Posts>({});

  const fetchPosts = async () => {
    const { data } = await axios.get('http://localhost:4000/posts');
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => (
    <div
      className='card'
      style={{ width: '30%', marginBottom: '20px' }}
      key={post.postId}
    >
      <div className='card-body'>
        <h3>{post.title}</h3>
        <CommentList postId={post.postId} />
        <CommentCreate postId={post.postId} />
      </div>
    </div>
  ));

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
