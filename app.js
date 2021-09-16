const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const saveRouter = require('./routes/saveRouter')

dotenv.config({ path: './config.env' });

const app = express();

app.use(express.json())

const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
  console.log('Database Connected!')
});

app.use('/api', saveRouter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server Started: ', PORT)
});