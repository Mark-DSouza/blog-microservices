import express from 'express';

const app = express();
app.use(express.json());

app.listen(4003, () => {
  console.log('Moderation Service listening on port 4003');
});
