const express = require('express');
const debug = require('debug')('app:sessionRouter');
const { MongoClient, ObjectID } = require('mongodb');
require('../config/strategies/local.strategy')
const sessions = require('../data/sessions.json');

const sessionsRouter = express.Router();
const speakerService=require('../services/speakerService')
sessionsRouter.use((req, res, next) => {
  if(req.user) {
    next()
  }
  else{
    res.redirect('/auth/signIn');
  }
})
sessionsRouter.route('/').get((req, res) => {
  const url =
  'mongodb+srv://niteshnishanth:iloveMe1@new-practice.p86ws.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'Globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const sessions = await db.collection('sessions').find().toArray();

      res.render('sessions', { sessions });
    } catch (error) {
      debug(error.stack);
    }
  })();
});

sessionsRouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  const url =
    'mongodb+srv://dbUser:1R7jzwoc2WuKOK4U@globomantics.o6s8j.mongodb.net?retryWrites=true&w=majority';
  const dbName = 'globomantics';

  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(url);
      debug('Connected to the mongo DB');

      const db = client.db(dbName);

      const session = await db
        .collection('sessions')
        .findOne({ _id: new ObjectID(id) });
      const speaker=await speakerService.getSpeakerById(session.speakers[0].id)
      session.speaker=speaker.data
      res.render('session', {
        session,
      });
    } catch (error) {
      debug(error.stack);
    }
    
  })();
});

module.exports = sessionsRouter;
