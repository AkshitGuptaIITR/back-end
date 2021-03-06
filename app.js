const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const saveRouter = require('./routes/saveRouter');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json())

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected!')
});

app.use(cors());
app.use('/api', saveRouter)
app.use('/', (req, res, next) => {
  res.send('Hello');
});

app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'InValid Route'
  });
  next()
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server Started: ', PORT)
});