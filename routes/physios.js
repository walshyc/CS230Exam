const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RandExp = require('randexp');
const { check, validationResult } = require('express-validator');
const Physio = require('../models/Physios');
const Session = require('../models/Sessions');


// Route to get all physios
router.get('/', async (req, res, next) => {
  try {
    const physios = await Physio.find();
    res.send(physios);
    console.log('Physios :' + physios);
  } catch (error) {
    res.json({ message: error });
  }
});

// Route to generate sample physios and add to database
router.get('/generate', async (req, res, next) => {
  try {
    let total = 5;
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
        addressOne: address.street,
        addressTwo: '',
        town: address.city,
        county: address.county,
        eircode: eircode.gen(),
      };
      usersArray.push(user);
    }

    Physio.insertMany(usersArray)
      .then(() => console.log('physios added'))
      .catch((err) => console.log(err));
    res.json(usersArray);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});


// Route to add a new physio to the database
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
  } = req.body;

  const physio = new Physio({
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
  });
  try {
    const newPhysio = await physio.save();
    res.json(newPhysio);
    console.log('New Physio Added:');
    console.log(newPhysio);
  } catch (error) {
    res.json({ message: error });
  }
});


// Route to get a specific physio by their ID
router.get('/:physioId', async (req, res, next) => {
  try {
    const physio = await Physio.findById(req.params.physioId);
    res.json(physio);
    console.log('Physio Found:');
    console.log(physio);
  } catch (error) {
    res.json({ message: error });
  }
});


// route to delete a physio
router.delete('/:physioId', async (req, res, next) => {
  try {
    const deletedPhysio = await Physio.remove({ _id: req.params.physioId });
    const sessions = await Session.deleteMany({
      physio: mongoose.Types.ObjectId(req.params.physioId),
    });
    res.json(deletedPhysio);
    console.log('Physio Deleted:');
    console.log(deletedPhysio);
  } catch (error) {
    res.json({ message: error });
  }
});

// route to update a physio
router.patch('/:physioId', async (req, res, next) => {
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
  } = req.body;
  try {
    const updatedPhysio = await Physio.updateOne(
      { _id: req.params.physioId },
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
        },
      }
    );
    res.json(updatedPhysio);
    console.log('Physio Updated:');
    console.log(updatedPhysio);
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
