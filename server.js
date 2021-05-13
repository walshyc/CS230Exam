const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
var RandExp = require('randexp');
const app = express();

// const User = require('./models/User');
// const Phone = require('./models/Phones');
// const Order = require('./models/Orders');

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

// User Routes
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
    console.log('Users :' + users);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post('/users', async (req, res) => {
  const {
    title,
    fname,
    lname,
    mobile,
    email,
    deliveryAddress,
    billingAddress,
  } = req.body;

  const user = new User({
    title,
    fname,
    lname,
    mobile,
    email,
    deliveryAddress,
    billingAddress,
  });
  try {
    const newUser = await user.save();
    res.json(newUser);
    console.log('New User Added:');
    console.log(newUser);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.json(user);
    console.log('User Found:');
    console.log(user);
  } catch (error) {
    res.json({ message: error });
  }
});
app.delete('/users/:userId', async (req, res) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.userId });
    res.json(deletedUser);
    console.log('User Deleted:');
    console.log(deletedUser);
  } catch (error) {
    res.json({ message: error });
  }
});
app.patch('/users/:userId', async (req, res) => {
  const { title, mobile, email, deliveryAddress, billingAddress } = req.body;
  try {
    const updatedUser = await User.updateOne(
      { _id: req.params.userId },
      {
        $set: {
          title,
          mobile,
          email,
          deliveryAddress,
          billingAddress,
        },
      }
    );
    res.json(updatedUser);
    console.log('User Updated:');
    console.log(updatedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

// Phone Routes

app.get('/phones', async (req, res) => {
  try {
    const phones = await Phone.find();
    res.send(phones);
    console.log('Phones Found');
    console.log(phones);
  } catch (error) {
    res.json({ message: error });
  }
});

app.post('/phones', async (req, res) => {
  const { manufacturer, model, price } = req.body;

  const phone = new Phone({
    manufacturer,
    model,
    price,
  });
  try {
    const newPhone = await phone.save();
    res.json(newPhone);
    console.log('New Phone Added:');
    console.log(newPhone);
  } catch (error) {
    res.json({ message: error });
  }
});

app.get('/phones/:phoneId', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.phoneId);
    res.json(phone);
    console.log('Phone found:');
    console.log(phone);
  } catch (error) {
    res.json({ message: error });
  }
});
app.delete('/phones/:phoneId', async (req, res) => {
  try {
    const deletedPhone = await Phone.remove({ _id: req.params.phoneId });
    res.json(deletedPhone);
    console.log('Phone Deleted:');
    console.log(deletedPhone);
  } catch (error) {
    res.json({ message: error });
  }
});
app.patch('/phones/:phoneId', async (req, res) => {
  const { manufacturer, model, price } = req.body;
  try {
    const updatedPhone = await Phone.updateOne(
      { _id: req.params.phoneId },
      { $set: { manufacturer, model, price } }
    );
    res.json(updatedPhone);
    console.log('Phone updated:');
    console.log(updatedPhone);
  } catch (error) {
    res.json({ message: error });
  }
});

// Order Routes
app.post('/orders', async (req, res) => {
  const { user, orders } = req.body;
  const fullOrder = orders.map((o) => {
    return {
      phone: mongoose.Types.ObjectId(o.phone),
    };
  });
  const order = new Order({
    user: mongoose.Types.ObjectId(user),
    items: fullOrder,
  });
  try {
    const newOrder = await order.save();
    res.json(newOrder);
    console.log('New Order:');
    console.log(newOrder);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate({ path: 'items.phone', model: 'Phones' });
    res.json(orders);
    console.log('Users Orders:');
    console.log(orders);
  } catch (error) {
    res.json({ message: error });
  }
});
app.get('/orders/:userId', async (req, res) => {
  try {
    const orders = await Order.find({
      user: mongoose.Types.ObjectId(req.params.userId),
    }).populate({ path: 'items.phone', model: 'Phones' });
    res.json(orders);
    console.log('Users Orders:');
    console.log(orders);
  } catch (error) {
    res.json({ message: error });
  }
});

// connect to database
mongoose.connect(
  'mongodb+srv://conor123:conor123@cluster0.xtigo.mongodb.net/assignment6and7?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  }
);
// ROute to generate user data
app.get('/generateData', (req, res) => {
  let total = 30;
  let usersArray = [];
  for (let index = 0; index < total; index++) {
    const userData = generateRandomName();
    let newBillingAddress = generateAddress();
    let newDeliveryAddress = generateAddress();
    let deliveryEircode = new RandExp(
      /(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ ][0-9AC-FHKNPRTV-Y]{4}$/
    );
    let billingEircode = new RandExp(
      /(?:^[AC-FHKNPRTV-Y][0-9]{2}|D6W)[ ][0-9AC-FHKNPRTV-Y]{4}$/
    );
    let user = {
      title: generateTitle(),
      fname: userData.first,
      lname: userData.last,
      mobile: generateMobile(),
      email: userData.email,
      deliveryAddress: {
        addressOne: newDeliveryAddress.street,
        addressTwo: '',
        town: newDeliveryAddress.city,
        county: newDeliveryAddress.county,
        eircode: deliveryEircode.gen(),
      },
      billingAddress: {
        addressOne: newBillingAddress.street,
        addressTwo: '',
        town: newBillingAddress.city,
        county: newBillingAddress.county,
        eircode: billingEircode.gen(),
      },
    };
    usersArray.push(user);
  }
  console.log(usersArray);
  // User.insertMany(usersArray)
  //   .then(() => console.log('users added'))
  //   .catch((err) => console.log(err));
  res.json(usersArray);
});

app.listen(4000, () => {});

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
