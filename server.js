const express = require('express');
const app = express();
const port = 9000;
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyparser = require("body-parser");
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);

const io = new Server(httpServer)

io.on('connection', (socket) => {
  console.log('someone is listening in.')
})

app.use(cors());
app.use(bodyparser.json());

const loginRouter = require ('./routes/login');
const conceptRouter = require('./routes/concept');
const topicRouter = require('./routes/topic');
const dashboardRouter = require('./routes/dashboard');

connectDB();

app.use('/login', loginRouter);
app.use('/concept', conceptRouter);
app.use('/topic', topicRouter);
app.use('/dashboard', dashboardRouter);



httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})