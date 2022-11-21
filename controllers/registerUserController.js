const pool = require('../databasepg');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const { validationResult } = require('express-validator');

registerUser = (req,res) => {
    console.log(req.body);
    var err = validationResult(req);
    if(!err.isEmpty()){
        res.status(403).send(err.mapped());
        return;
    }
    const {username, email, password} = req.body;
    pool.query('SELECT login_email FROM logins_table WHERE login_email = $1', [email])
        .then((result) => {
            if(result.rowCount > 0)
                throw createError(409,'user already exists');
            else{
                return bcrypt.hash(password, 8);
            }
        })
        .then((hashedPass) => {
            return pool.query(`
                INSERT into logins_table(login_id, login_username, login_email, login_password)
                VALUES (gen_random_uuid(),$1,$2,$3);
            `,[username, email, hashedPass]);
        })
        .then((result) => {
            res.send('user added to db');
        }) 
        .catch((err) => {
            console.log(err);
            res.status(err.status).send(err.message);
        })
};

module.exports = registerUser;