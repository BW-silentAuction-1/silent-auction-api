const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')
const Users = require("../user/user-model.js");

router.post("/register",validateUser, (req, res) => {
  const creds = req.body;

  function hashPass(creds) {
      var salt = bcrypt.genSaltSync(12);

      var hash = bcrypt.hashSync(creds.password,salt);
  return {
    ...creds,
    password: hash,
  };
}

Users.add(hashPass(creds))
  .then(saved => {
      res.status(201).json({message:'Successfully Registered!'})
  })
  .catch(err => {res.send(err);
    res.status(401).json({message: 'Error Logging in!'})});
});

router.post("/login",validateLogin, (req, res) => {
  let {username,password} = req.body;

Users.findBy({username})
  .then(([user]) => {
      if(user && bcrypt.compareSync(password,user.password)){
          //produce token
          const token = generateToken(user);
          //send token
          res.status(200).json({message:'Successfully Logged in!', token})
      } else {
          res.status(401).json({message: 'Error Logging in!'})
      }
      
  })
  .catch(err => res.status(500).json({message: err.message}));
});

function generateToken(user) {

  const payload = {
    userId: user.id,
    username: user.username
  }


  const options = {
    expiresIn: "1d",
  }

  return jwt.sign(payload, secrets.jwtSecret, options);



}

function validateUser(req, res, next) {
  const user = req.body;
  if (user) {
    if (!user.username || !user.password || !user.first_name || !user.last_name || !user.email) {
      res.status(400).json({message: "Missing one of the required fields!"})
    } else {
      next();
    }
  } else {
    res.status(400).json({message: "Body is required."})
  }
}

function validateLogin(req, res, next) {
  const user = req.body;
  if (user) {
    if (!user.username || !user.password) {
      res.status(400).json({message: "Missing one of the required fields!"})
    } else {
      next();
    }
  } else {
    res.status(400).json({message: "Body is required."})
  }
}


module.exports = router;
