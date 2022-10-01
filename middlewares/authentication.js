const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).send('authentication token not found...');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send('invalid authentication token...');
        req.username = user.username;
        next();
    })
}