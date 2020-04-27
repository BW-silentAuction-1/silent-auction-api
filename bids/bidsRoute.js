const db = require("../data/dbConfig");

module.exports = {
  getBidsByAuction,
  getBid,
  add,
  remove,
  edit,
  getLastBid,
}

function getBid(id) {
  return db('auction_bids')
    .where({id})
    .first();
}

function getBidsByAuction(auction_id) {
  return db('auction_bids')
    .where({auction_id})
    .orderBy('price')
    .join('users', 'users.id', 'auction_bids.user_id')
    .select('auction_bids.id', 'users.username', 'users.first_name', 'auction_bid.price', 'auction_bid.created_at')
}

function add(bid) {
  return db('auction_bids')
    .insert(bid, ['id'])
}

function getLastBid(auction_id) {
  return db('auction_bids')
    .where({auction_id})
    .orderBy('price')
    .first();
}

function edit(id, bid) {
  return db('auction_bids')
    .where({id})
    .update({price: bid.price, created_at: bid.created_at})
}

function remove(id) {
  return db('auction_bids')
    .where({id})
    .del();

}