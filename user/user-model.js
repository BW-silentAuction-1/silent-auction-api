const db = require("../data/dbConfig.js");
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')
const mapper = require("./map");


module.exports = {
  add,
  findBy,
  findById,
  getProfile,
};

function findBy(filter) {
  return db("user").where(filter);
}

async function add(user) {
  const [id] = await db("user").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("user")
    .where({ id })
    .first();
}

function getProfile(token) {

    var grab;
    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
            grab = decodedToken;
    })

  return db("user")
  .select("id", "username","first_name","last_name","email")
  .where("username",grab.username)

  }
