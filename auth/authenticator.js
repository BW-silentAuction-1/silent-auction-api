const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')


module.exports = (req,res,next) => {
    const token = req.headers.authorization;


    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
        if (!error) {
            req.decodedToken = decodedToken;
            next();
          } else {
            res.status(403).json({ error: "You must be logged in to do that." });
          }
    })

  };