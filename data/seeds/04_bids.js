
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auction_bids').del()
    .then(function () {
      // Inserts seed entries
      return knex('auction_bids').insert([
        {user_id:1,auction_id:1, price:250, date_listed:"4-26-20"},
        {user_id:2,auction_id:1, price:220, date_listed:"4-26-20"},
        {user_id:3,auction_id:1, price:150, date_listed:"4-26-20"}
      ]);
    });
};
