const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const Client = require('./models/Clients');
const Physio = require('./models/Physios');
const Session = require('./models/Sessions');

const clients = require('./routes/clients');
const physios = require('./routes/physios');
const sessions = require("./routes/sessions");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Routes
// app.get('/', (req, res) => {
//   fs.readFile(__dirname + '/assignment-05.html', 'utf8', (err, text) => {
//     res.send(text);
//   });
// });
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
// });

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

app.get('/generatePhysio', (req, res) => {
  let total = 30;
  let usersArray = [];
  for (let index = 0; index < total; index++) {
    const userData = generateRandomName();
    let address = generateAddress();
    let eircode = new RandExp(
      /(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ ][0-9AC-FHKNPRTV-Y]{4}$/
    );
    let user = {
      title: generateTitle(),
      fname: userData.first,
      lname: userData.last,
      mobile: generateMobile(),
      homePhone: generateMobile(),
      email: userData.email,
      address: {
        addressOne: address.street,
        addressTwo: '',
        town: address.city,
        county: address.county,
        eircode: eircode.gen(),
      },
    };
    usersArray.push(user);
  }
  //console.log(usersArray);
  Physio.insertMany(usersArray)
    .then(() => console.log('physios added'))
    .catch((err) => console.log(err));
  res.json(usersArray);
});
app.get('/generateSessions', (req, res) => {
  let total = 30;
  let usersArray = [];
  for (let index = 0; index < total; index++) {
    const userData = generateRandomName();
    let address = generateAddress();
    let eircode = new RandExp(
      /(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ ][0-9AC-FHKNPRTV-Y]{4}$/
    );
    let user = {
      title: generateTitle(),
      fname: userData.first,
      lname: userData.last,
      mobile: generateMobile(),
      homePhone: generateMobile(),
      email: userData.email,
      address: {
        addressOne: address.street,
        addressTwo: '',
        town: address.city,
        county: address.county,
        eircode: eircode.gen(),
      },
    };
    usersArray.push(user);
  }
  //console.log(usersArray);
  Physio.insertMany(usersArray)
    .then(() => console.log('physios added'))
    .catch((err) => console.log(err));
  res.json(usersArray);
});

app.listen(4002, () => {});


