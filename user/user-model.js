const db = require("../data/dbConfig.js");
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')
const mapper = require("./map");
const bcrypt = require("bcryptjs");

module.exports = {
  add,
  find,
  findBy,
  getProfile,
  update,
  remove
};

function find(token) {
    var grab;
    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
            grab = decodedToken;
    })

  return db("user")
  .select("id", "username")
  

}

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
//   return db("user")
//   .select("id", "username","first_name","last_name","email")
//   .where("id",grab.userId)
    let query = db("user as u");
    query.select("id", "username","first_name","last_name","email")
    .where("u.id",grab.userId).first();

    const promises = [query,getProfileAuctions(grab.userId),getProfileBids(grab.userId)];

    return Promise.all(promises).then(function(results) {
        let [user, auctions,bids] = results;
  
        if (user) {
          user.auctions = auctions;
          user.bids = bids;
          return mapper.userToBody(user);
        } else {
          return null;
        }
      });


  }

  function getProfileAuctions(Id) {
    return db("auctions")
      .where("user_id", Id)
      .then(items => items.map(item => mapper.auctionsToBody(item)));
  }

  function getProfileBids(Id) {
    return db("auction_bids")
      .where("user_id", Id)
      .then(items => items.map(item => mapper.bidsToBody(item)));
  }

  function update(token, changes) {
    var grab;
    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
            grab = decodedToken;
    })
    
    const newChanges = {
        ...changes,
        password: bcrypt.hashSync(changes.password, 12)
    }
    return db('user')
      .where('id', grab.userId)
      .update(newChanges);
  }

  function remove(token) {
    var grab;
    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
            grab = decodedToken;
    })

    return db('user')
      .where('id', grab.userId)
      .del();
  }