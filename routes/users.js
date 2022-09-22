var express = require('express');
var pool = require('../databasepg');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.query('SELECT * from test_table')
  .then((RESULT) => {
    res.send(RESULT.rows);
  })
  .catch((err) => {
    console.log(err);
    res.status(502).send();
  });
});

module.exports = router;
