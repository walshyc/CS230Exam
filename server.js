// Browser: Mozilla Firefox Developer Edition
// Operating System: Windows 10
// Browser Version: 87.0b5
// Also tested in Google Chrome version 88.0.4324.190

// Use npm install to install the various packages
// cd into client directory and use the command npm start to see the front end React application. npm install will be required in this directory also


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// imports of modals from models folder
const Client = require('./models/Clients');
const Physio = require('./models/Physios');
const Session = require('./models/Sessions');

// imports of routes from routes folder
const clients = require('./routes/clients');
const physios = require('./routes/physios');
const sessions = require("./routes/sessions");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Define Routes
app.use('/clients', clients);
app.use('/physios', physios);
app.use('/sessions', sessions);


// connect to database
mongoose.connect(
  'mongodb+srv://conor123:conor123@cluster0.xtigo.mongodb.net/cs230exam?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  }
);


app.listen(4002, () => {});


