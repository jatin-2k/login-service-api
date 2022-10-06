const pool = require('../databasepg');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

module.exports = (req,res,next) => {
    console.log(req.body);

    var {username, email, password} = req.body;
    pool.query('SELECT * FROM logins_table WHERE login_id = $1', [req.params.userId])
        .then((result) => {
            if(result.rowCount > 0){
                req.user = {}
                req.user.id = req.params.userId
                req.user.username = username || result.rows[0].login_username
                req.user.email = email || result.rows[0].login_email
                if(!password) return result.rows[0].login_password
                else return bcrypt.hash(password, 8)
            }
            else{
                throw createError(404,'user dose not exists');
            }
        })
        .then((hashedPass) => {
            return pool.query(`
                UPDATE logins_table
                SET login_username = $1, login_email = $2, login_password = $3
                WHERE login_id = $4;
            `,[req.user.username, req.user.email, hashedPass, req.user.id]);
        })
        .then((result) => {
            res.send(req.user);
        }) 
        .catch((err) => {
            console.log(err);
            res.status(err.status).send(err.message);
        })
}