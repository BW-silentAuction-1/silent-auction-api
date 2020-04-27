const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticator.js');
const authRouter = require('../auth/auth-router.js');
const userRouter = require('../user/user-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());



server.get("/", (req, res) => {
    res.status(200).json({ api: "Silent auction api is up" });
  });
  
server.use('/api/auth', authRouter);
server.use('/api/users', authenticate, userRouter);

module.exports = server;
