
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      return knex('auctions').insert([
        {user_id:1, name: "Camera", item_description:"Nikon digital camera", date_started:"4-26-20", date_ending:"5-1-20", item_price:"250",image:""},
        {user_id:2, name: "Game console", item_description:"Super Nintendo Entertainment System", date_started:"4-28-20", date_ending:"5-5-20", item_price:"39.99",image:""},
        {user_id:3, name: "Guitar", item_description:"Fender", date_started:"4-24-20", date_ending:"4-30-20", item_price:"300",image:""}
      ]);
    });
};
