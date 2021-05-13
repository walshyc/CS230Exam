const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const RandExp = require('randexp');
const Client = require('../models/Clients');
const Session = require('../models/Sessions');


// Route to get all Clients
router.get('/', async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.send(clients);
    console.log('Clients :' + clients);
  } catch (error) {
    res.json({ message: error });
  }
});

// Route to generate sample clients and add to database
router.get('/generate', async (req, res, next) => {
  try {
    let total = 5;
    let usersArray = [];

    const referred = ['Doctor', 'Family member', 'Work', 'Friend'];
    for (let index = 0; index < total; index++) {
      const userData = generateRandomName();
      let address = generateAddress();
      let eircode = new RandExp(
        /(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ ][0-9AC-FHKNPRTV-Y]{4}$/
      );

      // https://gist.github.com/miguelmota/5b67e03845d840c949c4
      const randomDate = (start, end) => {
        return new Date(
          start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
      };

      const isDate18orMoreYearsOld = (day, month, year) => {
        return new Date(year + 18, month - 1, day) <= new Date();
      };

      const dob = randomDate(new Date(1960, 0, 1), new Date());

      let user = {
        title: generateTitle(),
        fname: userData.first,
        lname: userData.last,
        mobile: generateMobile(),
        homePhone: generateMobile(),
        email: userData.email,
        addressOne: address.street,
        addressTwo: '',
        town: address.city,
        county: address.county,
        eircode: eircode.gen(),
        dob,
        createdDate: randomDate(new Date(2015, 0, 1), new Date()),
        parentGuardian: isDate18orMoreYearsOld(
          dob.getDay(),
          dob.getMonth(),
          dob.getFullYear()
        )
          ? ''
          : generateRandomName().first + ' ' + generateRandomName().last,
        permission: index % 2 == 0 ? true : false,
        referredBy: referred[Math.floor(Math.random() * (3 - 0 + 1)) + 0],
        doctor: generateRandomName().first + ' ' + generateRandomName().last,
      };
      usersArray.push(user);
    }
    await Client.insertMany(usersArray)
      .then(() => console.log('clients added'))
      .catch((err) => console.log(err));
    res.json(usersArray);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Route to add a new client to the database
router.post('/', async (req, res, next) => {
  const {
    title,
    fname,
    lname,
    mobile,
    homePhone,
    email,
    addressOne,
    addressTwo,
    town,
    county,
    eircode,
    dob,
    createdDate,
    parentGuardian,
    permission,
    doctor,
    referredBy,
  } = req.body;

  const client = new Client({
    title,
    fname,
    lname,
    mobile,
    homePhone,
    email,
    addressOne,
    addressTwo,
    town,
    county,
    eircode,
    dob,
    createdDate,
    parentGuardian,
    permission,
    doctor,
    referredBy,
  });
  try {
    const newClient = await client.save();
    res.json(newClient);
    console.log('New Client Added:');
    console.log(newClient);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Route to get a specific client by their ID
router.get('/:clientId', async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.clientId);
    res.json(client);
    console.log('client Found:');
    console.log(client);
  } catch (error) {
    res.json({ message: error });
  }
});

// route to delete a client
router.delete('/:clientId', async (req, res, next) => {
  try {
    const deletedClient = await Client.remove({ _id: req.params.clientId });
    const sessions = await Session.deleteMany({
      client: mongoose.Types.ObjectId(req.params.clientId),
    });

    res.json(deletedClient);
    console.log('Client Deleted:');
    console.log(deletedClient);
  } catch (error) {
    res.json({ message: error });
  }
});

// route to update a client by using their ID
router.patch('/:clientId', async (req, res, next) => {
  const {
    title,
    fname,
    lname,
    mobile,
    homePhone,
    email,
    addressOne,
    addressTwo,
    town,
    county,
    eircode,
    dob,
    createdDate,
    parentGuardian,
    permission,
    doctor,
    referredBy,
  } = req.body;
  try {
    const updatedClient = await Client.updateOne(
      { _id: req.params.clientId },
      {
        $set: {
          title,
          fname,
          lname,
          mobile,
          homePhone,
          email,
          addressOne,
          addressTwo,
          town,
          county,
          eircode,
          dob,
          createdDate,
          parentGuardian,
          permission,
          doctor,
          referredBy,
        },
      }
    );
    res.json(updatedClient);
    console.log('Client Updated:');
    console.log(updatedClient);
  } catch (error) {
    res.json({ message: error });
  }
});

// helper functions to generate random user data
const generateRandomName = () => {
  const firstNames = `Conor
          Daniel
          Adam
          Liam
          Tadhg
          Luke
          Charlie
          Darragh
          Harry
          Oisín
          Michael
          Alex
          Fionn
          Cillian
          Thomas
          Jamie
          Patrick
          Rían
          Finn
          Seán
          Oliver
          Ryan
          Dylan
          Emily
          Grace
          Fiadh
          Sophie
          Hannah
          Amelia
          Ava
          Ellie
          Ella
          Mia
          Lucy
          Emma
          Lily
          Olivia
          Chloe
          Aoife
          Caoimhe
          Molly
          Anna
          Sophia
          Holly
          Freya
          Saoirse
          Kate
          Sadie
          Robyn
          Katie
          Ruby
          Evie
          Éabha
          Cara`.split(/\n/);

  const lastNames = `Murphy
          Kelly
          Sullivan
          Walsh
          Smith
          Byrne
          Ryan
          Connor
          Reilly
          Doyle
          McCarthy
          Gallagher
          Doherty
          Kennedy
          Lynch
          Murray
          Quinn
          Moore
          McLaughlin
          Carroll
          Connolly
          Daly
          Connell
          Wilson
          Dunne
          Brennan
          Burke
          Collins
          Campbell
          Clarke
          Johnston
          Hughes
          Farrell`.split(/\n/);

  const emails = `gmail.com
    yahoo.com
    hotmail.com
    live.com
    icloud.com
    eircom.net
    mail.com`.split(/\n/);

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };

  const first = firstNames.sample().trim();
  const last = lastNames.sample().trim();
  const email =
    first.toLowerCase() +
    '.' +
    last.toLowerCase() +
    '@' +
    emails.sample().trim();

  return {
    first,
    last,
    email,
  };
};

const generateAddress = () => {
  // https://www.mockaroo.com/ used to generate random street names
  const street = `Summer Ridge Circle
    North Terrace
    2nd Court
    Surrey Alley
    Buena Vista Terrace
    Mcbride Place
    Jenna Park
    Independence Drive
    Buhler Avenue
    Chive Circle
    Kipling Point
    Barnett Alley
    Riverside Pass
    Fair Oaks Junction
    Canary Lane
    Bay Alley
    Dovetail Road
    Orin Parkway
    Division Road
    Shelley Drive
    Dawn Point
    Talisman Lane
    Cottonwood Way
    Evergreen Plaza
    Anderson Plaza
    Monterey Road
    Fisk Street
    Kenwood Place
    Upham Point
    Stone Corner Junction
    Everett Court
    Macpherson Center
    Thackeray Pass
    Autumn Leaf Terrace
    Homewood Trail
    Graceland Way
    Russell Terrace
    Cordelia Junction
    6th Road
    Ridgeview Pass
    Ridgeview Terrace
    Jenna Alley
    Banding Junction
    Bluestem Way
    Becker Crossing
    Rigney Crossing
    Charing Cross Drive
    Brickson Park Drive
    Weeping Birch Park
    Myrtle Hill
    Eagan Hill
    `.split(/\n/);
  const city = `Dublin
    Cork
    Galway
    Limerick
    Waterford
    Drogheda
    Swords
    Tralee
    Dunleary
    Carlow
    Naas
    Kilkenny
    Sligo
    Monaghan
    Mullingar
    Tallaght
    Wicklow
    Clonmel
    Wexford
    Ennis
    Longford
    Trim
    Carrick on Shannon
    Tullamore
    Nenagh
    An Cabhan
    Port Laoise
    Castlebar
    Lifford
    Cobh
    Killarney
    Shannon
    Dungarvan
    Kildare
    Carrigtohill
    Dunboyne
    Donegal`.split(/\n/);

  const county = `Antrim
    Armagh
    Carlow
    Cavan
    Clare
    Cork
    Derry
    Donegal
    Down
    Dublin
    Fermanagh
    Galway
    Kerry
    Kildare
    Kilkenny
    Laois
    Leitrim
    Limerick
    Longford
    Louth
    Mayo
    Meath
    Monaghan
    Offaly
    Roscommon
    Sligo
    Tipperary
    Tyrone
    Waterford
    Westmeath
    Wexford
    Wicklow`.split(/\n/);

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  return {
    street: Math.floor(Math.random() * 120) + ' ' + street.sample().trim(),
    city: city.sample().trim(),
    county: 'Co. ' + county.sample().trim(),
  };
};

const generateTitle = () => {
  const title = `Mx
    Ms
    Mr
    Mrs
    Miss
    Dr`.split(/\n/);

  Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)];
  };
  return title.sample().trim();
};

const generateMobile = () => {
  let operaterCode = ['087', '089', '086', '085'];
  let number = Math.floor(Math.random() * (9999999 - 1000000 + 1) + 1000000);
  return (
    operaterCode[Math.floor(Math.random() * (3 - 1 + 1) + 1)] + number + ''
  );
};

module.exports = router;
