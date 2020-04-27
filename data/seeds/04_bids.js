
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {user_id:1,auction_id:1, price:250, date_started:"4-26-20"},
        {user_id:2,auction_id:1, price:220, date_started:"4-26-20"},
        {user_id:3,auction_id:1, price:150, date_started:"4-26-20"}
      ]);
    });
};
