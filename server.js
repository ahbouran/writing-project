const express = require('express');
const app = express();
const port = 9000;
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require("body-parser");
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config()

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:3000`,
    credentials: true,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('someone is listening in.')
})

io.on('disconnect', () => {
  console.log('someone disconnected!')
})

app.use(cors());
app.use(bodyparser.json());

const loginRouter = require ('./routes/login');
const conceptRouter = require('./routes/concept');
const topicRouter = require('./routes/topic');
const dashboardRouter = require('./routes/dashboard');
const { disconnect } = require('process');


async function run() {
  try {
    await mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });
    
    const connection = mongoose.connection;

    console.log('MongoDB is connected')
    console.log('Setting change streams');
    const topicsChangeStream = connection.collection('topics').watch();

    topicsChangeStream.on('change', (change) => {
      switch(change.operationType) {
        case 'insert':
          const newTopic = {
            _id: change.fullDocument._id,
            name: change.fullDocument.name
          };

          io.emit('addTopic', newTopic);
          break
        
        case 'delete':
          io.emit('deleteTopic', change.documentKey._id)
          break;
        
        case 'update':
          const updatedTopic = {
            _id: change.documentKey._id,
            name: change.updateDescription.updatedFields.name
          }
          io.emit('updateTopic', updatedTopic)
          break;
      }
    })
    

  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

run()


app.use('/login', loginRouter);
app.use('/concept', conceptRouter);
app.use('/topic', topicRouter);
app.use('/dashboard', dashboardRouter);



httpServer.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})