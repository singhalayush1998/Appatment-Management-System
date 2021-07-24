const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const cors = require('cors');
dotenv.config({ path: './.env' });
const connect = require('./db/connect');

const PORT = process.env.PORT;

const UsersData = require('./model/user.model');

const app = express();
app.use(cors());
app.use(express.json());

app.use(require('./router/auth'));

async function start() {
  await connect();
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

modules.export = start;
