const express = require('express');
const app = express();
const port = 9000;
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

app.use(cors())

const loginRouter = require ('./routes/login');
const conceptRouter = require('./routes/concept');
const topicRouter = require('./routes/topic');
const dashboardRouter = require('./routes/dashboard');

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/login', loginRouter);
app.use('/concept', conceptRouter);
app.use('/topic', topicRouter);
app.use('/dashboard', dashboardRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})