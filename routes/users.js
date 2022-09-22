var express = require('express');
var pool = require('../databasepg');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  pool.connect()
  .then((client) => {
    return client.query('SELECT * from test_table;')
  })
  .then((RESULT) => {
    res.send(RESULT.rows);
  })
  .catch((err) => {
    console.log(err);
    res.send(err);
  });
});

module.exports = router;
