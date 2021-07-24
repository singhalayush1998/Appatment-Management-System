const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


// port and database
dotenv.config({ path: './.env' });
const connect = require('./db/connect');
const PORT = process.env.PORT;


// models
const UsersData = require('./model/user.model');
const Resident = require('./model/resident.model');
const Flats = require('./model/flat.model');

//controllers
app.use(require('./Controller/auth.controller'));
app.use(require('./Controller/flat.controller'));
app.use(require('./Controller/resident.controller'));

async function start() {
  await connect();
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

module.exports = start;
