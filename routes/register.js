const express = require('express');
const router = express.Router();
const registerUserController = require('../controllers/registerUserController');

router.get('/', (req,res) => {
    res.send("yet to implement...");
});

router.put('/', (req,res) => {
    res.send("yet to implement...");
});

router.post('/', registerUserController);

router.delete('/', (req,res) => {
    res.send("yet to implement...");
});


module.exports = router;