import axios from 'axios';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/events', async (req, res) => {
  const event = req.body;
  console.log('Event received by the Event Bus', event);

  try {
    await Promise.all([
      axios.post('http://localhost:4000/events', event),
      axios.post('http://localhost:4001/events', event),
      axios.post('http://localhost:4002/events', event),
    ]);

    res.status(200).send({ status: 'OK' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

app.listen(4005, () => {
  console.log('Event Bus listening on port 4005');
});
