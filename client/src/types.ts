export type Comment = {
  commentId: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
};

export type OnSubmitEvent = React.FormEvent<HTMLFormElement>;
