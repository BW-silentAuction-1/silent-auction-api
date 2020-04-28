const db = require('../data/dbConfig');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js')
const mapper = require('./auctionMap');


module.exports = {
    getAuction,
    getAll,
    add,
    getHighestBid,
    edit,
    remove
}

function getAuction(auctionID,token) {

    var grab;
    jwt.verify(token, secrets.jwtSecret, (error,decodedToken) => {
            grab = decodedToken;
    })
 

       let query = db("auctions as a")
      .where("a.id",auctionID).first();
      const promises = [query,getAuctionBids(auctionID),checkOwnership(auctionID)];
      return Promise.all(promises).then(function(results) {
          let [auction, bids,owner] = results;
          if (auction && owner[0].user_id == grab.userId) {
            auction.bids = bids;
            return mapper.auctionsToBody(auction);
          } else if (auction) {
            return db("auctions as a")
            .where("a.id",auctionID).first();
          }
          else {
            return null
          }
        });


      }



function checkOwnership(auctionID){

  return db('auctions as a')
  .select('a.user_id')
  .where('a.id',auctionID)
  .then(items => items.map(item => mapper.getOwner(item)));


}

function getAuctionBids(Id) {
  return db("auction_bids as ab")
    .join('auctions as a','a.id','ab.auction_id')
    .join('user as u','u.id','ab.user_id')
    .select('ab.id','ab.auction_id','ab.price','ab.date_listed','u.username')
    .where("ab.auction_id", Id)
    .then(items => items.map(item => mapper.bidsToBody(item)));
}

function getAll() {
    return db('auctions as auction ')
        .join('user','user.id', 'auction.id')
        .select('auction.id','auction.user_id', 'user.username','auction.item_description', 'auction.item_price','auction.date_started', 'auction.date_ending', 'auction.image')

}

function getHighestBid(auction_id) {
    return db ('bids')
    .where({auction_id})
    .orderBy('price')
    .select('bids.price')
    .first()
}

function add(auctions) {
    return db('auctions')
    .insert(auctions, ['id'])
  }
  
  function edit(id, auctions) {
    return db('auctions')
    .update(auctions)
    .where({id})
  }
  
  function remove(id) {
    return db('auctions')
      .where({id})
      .del();
  }


