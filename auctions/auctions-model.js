const db = require('../data/dbConfig');

module.exports = {
    getAuction,
    getAll,
    add,
    getHighestBid,
    edit,
    remove
}

function getAuction(id) {
    return db('auctions for')
        .join('users','users.id', 'auction.id')
        .select('auction.id','auction.user_id', 'users.username-seller', 'users.first_name','auction.description', 'auction.starting_price','auction.date_starting', 'auction.date_ending', 'auction.image')
        .where(`auction.id = ${id}`)
}

function getAll() {
    return db('auctions for')
        .join('users','users.id', 'auction.id')
        .select('auction.id','auction.user_id', 'users.username-seller', 'users.first_name','auction.description', 'auction.starting_price','auction.date_starting', 'auction.date_ending', 'auction.image')
        .where(`auction.id = ${id}`)
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