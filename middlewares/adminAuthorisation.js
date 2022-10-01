const pool = require('../databasepg');
const createError = require('http-errors');

module.exports = (req, res, next) => {
    pool.query('SELECT * FROM logins_table WHERE login_username = $1',[req.username])
    .then((result) => { // user exists or not
        if(result.rowCount === 0){
            throw createError(404,'user dose not exist...');
        }
        else{
            return result.rows[0];
        }
    })
    .then((userdata) => {
        if(userdata.login_user_type === 'admin'){
            next()
        }
        else throw createError(403,'you are not authorised to access this route...');
    })
    .catch((err) => {
        console.log(err);
        res.status(err.status);
        res.send(err.message);
    });
}