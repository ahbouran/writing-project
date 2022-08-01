const express = require('express');
const app = express();
const port = 9000;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors())

const loginRouter = require ('./routes/login');
const conceptRouter = require('./routes/concept');

main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://localhost/concepts')
}

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/login', loginRouter);
app.use('/concept', conceptRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})