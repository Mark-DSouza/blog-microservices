import express from 'express';
import axios, { AxiosResponse } from 'axios';

import type { EventRequest, ModerationCompletedEvent } from './types';

const app = express();
app.use(express.json());

app.post('/events', async (req: EventRequest, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';
    try {
      await axios.post<
        any,
        AxiosResponse<any, ModerationCompletedEvent>,
        ModerationCompletedEvent
      >('http://localhost:4005/events', {
        type: 'ModerationCompleted',
        data: {
          ...data,
          status,
        },
      });
    } catch (error) {
      console.error(
        '\n\n\n********************** Start of ERROR in the Moderation Service **********************'
      );
      console.error(error);
      console.error(
        '********************** End of ERROR in the Moderation Service **********************\n\n\n'
      );
    }
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Moderation Service listening on port 4003');
});
