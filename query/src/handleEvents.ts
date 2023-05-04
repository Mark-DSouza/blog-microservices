import type { Posts } from './index';
import type { Event } from './types';

export const handleEvents = (posts: Posts, event: Event) => {
  const { type, data } = event;

  if (type === 'PostCreated') {
    const { postId, title } = data;
    posts[postId] = {
      postId,
      title,
      comments: [],
    };
  }

  if (type === 'CommentCreated') {
    const { commentId, content, postId, status } = data;
    console.log('postId: ', postId);
    console.log('Post[postId]: ', posts[postId]);
    console.log('comments of that: ', posts[postId].comments);
    posts[postId].comments.push({ commentId, content, status });
  }

  if (type === 'CommentUpdated') {
    const { commentId, content, postId, status } = data;
    const comment = posts[postId].comments.find(
      (comment) => comment.commentId === commentId
    );

    if (comment) {
      comment.content = content;
      comment.status = status;
    }
  }
};
