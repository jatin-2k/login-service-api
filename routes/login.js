const express = require('express');
const router = express.Router();
const loginUserController = require('../controllers/loginUserController');

router.get('/', (req,res) => {
    res.send("yet to implement...");
});

router.put('/', (req,res) => {
    res.send("yet to implement...");
});

router.post('/', loginUserController);

router.delete('/', (req,res) => {
    res.send("yet to implement...");
});


module.exports = router;