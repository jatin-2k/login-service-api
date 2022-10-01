require('dotenv').config();

const pool = require('../databasepg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

loginUser = (req, res, next) => {
    console.log(req.body);
    
    pool.query('SELECT * FROM logins_table WHERE login_username = $1',[req.body.username])
        .then((result) => { // user exists or not
            if(result.rowCount === 0){
                throw createError(404,'user dose not exist...');
            }
            else{
                return result.rows[0];
            }
        })
        .then((userdata) => { // user has correct password or not
            bcrypt.compare(req.body.password, userdata.login_password)
                .then((isAuthenticated) => {
                    if(!isAuthenticated){
                        throw createError(403,'Wrong Password...');
                    }
                    else return userdata
                })
                .then((userdata) => { // generate token for the login
                    const user = { username: userdata.login_username };
                    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                    res.json({accessToken: token});
                })
                .catch((err) => {
                    console.log(err);
                    res.status(err.status);
                    res.send(err.message);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(err.status);
            res.send(err.message);
        });
}

module.exports = loginUser;