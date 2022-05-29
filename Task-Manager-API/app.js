const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');

// middleware
app.use(express.json());

app.use('/api/v1/tasks', tasksRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
