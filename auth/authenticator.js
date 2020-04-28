const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')


module.exports = (req,res,next) => {
    const token = req.headers.authorization;
    var grab ;


    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
        if (!error) {
            req.decodedToken = decodedToken;
            grab = decodedToken;
            next();
          } else {
            res.status(403).json({ error: "You must be logged in to do that." });
          }
    })
    console.log(grab.username)
  };