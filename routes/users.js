var express = require('express');
var router = express.Router();
const registerUserController = require('../controllers/registerUserController');
const retrieveUsersController = require('../controllers/retrieveUsersController');

/* users at /users. endpoint*/
router.get('/', retrieveUsersController);

router.put('/', (req,res) => {
  res.send("yet to implement...");
});

router.post('/', registerUserController);

router.delete('/', (req,res) => {
  res.send("yet to implement...");
});

/* user at /users/{username} endpoint*/
router.get('/:userId', (req,res) => {
  res.send("yet to implement it...");
});

router.put('/:userId', (req,res) => {
  res.send(req.params);
});

router.post('/:userId', (req,res) => {
  res.send("yet to implement it...");
});

router.delete('/:userId', (req,res) => {
  res.send("yet to implement it...");
});

module.exports = router;
