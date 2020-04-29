const db = require("../data/dbConfig.js");
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

function find() {

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

function getProfile(userId) {

    let query = db("user as u");
    query.select("id", "username","first_name","last_name","email")
    .where("u.id",userId).first();

    const promises = [query,getProfileAuctions(userId),getProfileBids(userId)];

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
    return db("auction_bids as ab")
      .join('auctions as a','a.id','ab.auction_id')
      .select('ab.id','ab.auction_id','ab.price','ab.date_listed','a.name')
      .where("ab.user_id", Id)
      .then(items => items.map(item => mapper.bidsToBody(item)));
  }

  function update(userId, changes) {

    if(changes.password){
    const newChanges = {
        ...changes,
        password: bcrypt.hashSync(changes.password, 12)
    }
        } else {
            newChanges = changes;
        }
    return db('user')
      .where('id', userId)
      .update(newChanges);
  }

  function remove(userId) {


    return db('user')
      .where('id', userId)
      .del();
  }