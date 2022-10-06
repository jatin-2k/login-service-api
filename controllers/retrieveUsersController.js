var pool = require('../databasepg');

module.exports = (req, res, next) => {
    pool.query('SELECT login_id, login_username, login_email from logins_table;')
    .then((RESULT) => {
        res.send(RESULT.rows);
    })
    .catch((err) => {
        console.log(err);
        res.send(err);
    });
}