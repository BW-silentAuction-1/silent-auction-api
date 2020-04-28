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
  return db('auctions as auction ')
  .join('user','user.id', 'auction.id')
  .select('auction.id','auction.user_id', 'user.first_name','auction.item_description', 'auction.item_price','auction.date_started', 'auction.date_ending', 'auction.image')
    .where('auction.id' ,id).first()
}

function getAll() {
    return db('auctions as auction ')
        .join('user','user.id', 'auction.id')
        .select('auction.id','auction.user_id', 'user.first_name','auction.item_description', 'auction.item_price','auction.date_started', 'auction.date_ending', 'auction.image')

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