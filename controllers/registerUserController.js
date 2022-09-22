const pool = require('../databasepg');
const bcrypt = require('bcryptjs');

registerUser = (req,res) => {
    console.log(req.body);

    const {username, email, password} = req.body;
    pool.query('SELECT login_email FROM logins_table WHERE login_email = $1', [email])
        .then((result) => {
            if(result.rowCount > 0)
                res.send('user already exists');
            else{
                return bcrypt.hash(password, 8);
            }
        })
        .then((hashedPass) => {
            return pool.query(`
                INSERT into logins_table(login_username, login_email, login_password)
                VALUES ($1,$2,$3);
            `,[username, email, hashedPass]);
        })
        .then((result) => {
            res.send('user added to db');
        }) 
        .catch((err) => {
            console.log(err);
            res.send(err);
        })
};

module.exports = registerUser;