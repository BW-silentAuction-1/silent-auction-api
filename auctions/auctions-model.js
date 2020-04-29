const db = require('../data/dbConfig');
const mapper = require('./auctionMap');
const moment = require("moment");

module.exports = {
    getAuction,
    checkAuction,
    getAll,
    add,
    getHighestBid,
    edit,
    remove
}

function getAuction(auctionID,userId) {

       let query = db("auctions as a")
       .join('user','user.id', 'a.user_id')
       .select('a.id','a.user_id', 'user.username','a.name','a.item_description', 'a.item_price','a.date_started', 'a.date_ending', 'a.image')
      .where("a.id",auctionID).first();
      const promises = [query,getAuctionBids(auctionID),checkOwnership(auctionID),getHighestBid(auctionID)];
      return Promise.all(promises).then(function(results) {
          let [auction, bids,owner,highestBid] = results;
          if (auction && owner[0].user_id == userId) {
            auction.bids = bids;
            auction.highestBid = highestBid.price;
            return mapper.auctionsToBody(auction);
          } else if (auction) {
            auction.highestBid = highestBid.price;
            return mapper.auctionsToBody(auction);
          }
          else {
            return null
          }
        });
      }

  function checkAuction(id) {
    return db('auctions as a ')
      .where('a.id' ,id)
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

function getHighestBid(Id) {
  
  return db('auction_bids as ab')
  .select('ab.price')
  .from('auction_bids as ab')
  .where('ab.auction_id',Id)
  .union(db.raw(`select a.item_price from auctions as a where a.id = ${Id}`))
  .orderBy('price','desc')
  .first()
  .then(item => mapper.highestBidToBody(item))

}

function getAll() {
    return db('auctions as auction ')
        .join('user','user.id', 'auction.user_id')
        .select('auction.id','auction.user_id', 'user.username','auction.name','auction.item_description', 'auction.item_price','auction.date_started', 'auction.date_ending', 'auction.image')

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
    return db("auctions")
      .where("id", id)
      .del();
  }


