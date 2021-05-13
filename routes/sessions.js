const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { check, validationResult } = require('express-validator');
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

const Session = require('../models/Sessions');
const Client = require('../models/Clients');
const Physio = require('../models/Physios');


// Route to get all Sessions
router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.find()
      .populate({ path: 'client', model: 'Client' })
      .populate({ path: 'physio', model: 'Physio' });
    res.send(sessions);
    console.log('sessions :' + sessions);
  } catch (error) {
    res.json({ message: error });
  }
});

// Route to generate sample sessions and add to database
router.get('/generate', async (req, res, next) => {
  try {
    const total = 30;
    const prices = [49, 79, 99, 129, 149];
    const duration = [
      '30 mins',
      '1 hour',
      '1 hour 30mins',
      '2 hours',
      'Cancelled',
      'No Show',
    ];
    const type = [
      'Assessment',
      'Massage Therapy',
      'Stretching and Exercising',
      'Technology(Lasers and /or Ultrasound)',
      'Hydrotherapy',
      'Electrotherapy',
    ];
    let sessionArray = [];
    const clients = await Client.find();
    const physios = await Physio.find();
    const clientIds = clients.map((cli) => cli._id);
    const physioIds = physios.map((phy) => phy._id);

    // https://gist.github.com/miguelmota/5b67e03845d840c949c4
    const randomDate = (start, end) => {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    };

    const getRandom = (array) => {
      return Math.floor(Math.random() * (array.length - 1 - 0 + 1)) + 0;
    };

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8,
        min: 4,
      },
      wordsPerSentence: {
        max: 16,
        min: 4,
      },
    });

    for (let index = 0; index < total; index++) {
      let session = {
        date: randomDate(new Date(2015, 0, 1), new Date()),
        time: randomDate(new Date(2015, 0, 1), new Date()).getTime(),
        physio: mongoose.Types.ObjectId(physioIds[getRandom(physioIds)]),
        client: mongoose.Types.ObjectId(clientIds[getRandom(clientIds)]),
        price: prices[getRandom(prices)],
        sessionNumber: uuidv4(),
        duration: duration[getRandom(duration)],
        type: type[getRandom(type)],
        notes: lorem.generateSentences(6),
      };
      sessionArray.push(session);
    }
    //console.log(usersArray);
    Session.insertMany(sessionArray)
      .then(() => console.log('sessions added'))
      .catch((err) => console.log(err));
    res.json(sessionArray);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Route to add a new session to the database
router.post('/', async (req, res, next) => {
  console.log(req.body);
  const { date, time, physio, client, price, duration, type, notes } = req.body;

  // https://stackoverflow.com/questions/40480631/convert-from-string-to-datetime-in-node-js
  const input = time;
  const parts = input.split(':');
  const minutes = parts[0] * 60 + parts[1];
  const inputDate = new Date(minutes * 60 * 1000);

  const session = new Session({
    date,
    time: inputDate,
    physio: mongoose.Types.ObjectId(physio),
    client: mongoose.Types.ObjectId(client),
    price,
    sessionNumber: uuidv4(),
    duration,
    type,
    notes,
  });
  try {
    const newSession = await session.save();
    res.json(newSession);
    console.log('New Session Added:');
    console.log(newSession);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Route to get a clients session by their ID
router.get('/client/:clientId', async (req, res, next) => {
  try {
    const sessions = await Session.find({
      client: mongoose.Types.ObjectId(req.params.clientId),
    })
      .populate({ path: 'client', model: 'Client' })
      .populate({ path: 'physio', model: 'Physio' });
    res.json(sessions);
    console.log('Users Sessions:');
    console.log(sessions);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

// Route to get a physios session by their ID
router.get('/physio/:physioId', async (req, res, next) => {
  try {
    const sessions = await Session.find({
      physio: mongoose.Types.ObjectId(req.params.physioId),
    })
      .populate({ path: 'client', model: 'Client' })
      .populate({ path: 'physio', model: 'Physio' });
    res.json(sessions);
    console.log('Physio Sessions:');
    console.log(sessions);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});


// route to get a session by ID 
router.get('/:sessionId', async (req, res, next) => {
  try {
    const session = await session.findById(req.params.sessionId);
    res.json(session);
    console.log('session Found:');
    console.log(session);
  } catch (error) {
    res.json({ message: error });
  }
});

// route to delete a session
router.delete('/:sessionId', async (req, res, next) => {
  try {
    const deletedSession = await Session.remove({ _id: req.params.sessionId });
    res.json(deletedSession);
    console.log('Session Deleted:');
    console.log(deletedSession);
  } catch (error) {
    res.json({ message: error });
  }
});

// route to update a session by using their ID
router.patch('/:sesionId', async (req, res, next) => {
  const { date, time, physio, client, price, duration, type, notes } = req.body;
  console.log(req.body.physio);
  // https://stackoverflow.com/questions/40480631/convert-from-string-to-datetime-in-node-js
  const input = time;
  const parts = input.split(':');
  const minutes = parts[0] * 60 + parts[1];
  const inputDate = new Date(minutes * 60 * 1000);
  try {
    const updatedSession = await Session.updateOne(
      { _id: req.params.sesionId },
      {
        $set: {
          date,
          time: inputDate,
          physio: mongoose.Types.ObjectId(physio),
          client: mongoose.Types.ObjectId(client),
          price,
          duration,
          type,
          notes,
        },
      }
    );
    res.json(updatedSession);
    console.log('Session Updated:');
    console.log(updatedSession);
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

module.exports = router;
