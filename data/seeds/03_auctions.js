
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('auctions').del()
    .then(function () {
      // Inserts seed entries
      return knex('auctions').insert([
        {user_id:1, name: "Camera", item_description:"Nikon digital camera", date_started:"2020-04-28 22:58:01", date_ending:"2020-05-02 16:40:23", item_price:"250",image:"https://i.imgur.com/my9SknX.jpg"},
        {user_id:2, name: "Game console", item_description:"Super Nintendo Entertainment System", date_started:"2020-04-26 12:58:01", date_ending:"2020-05-02 16:40:23", item_price:"39.99",image:"https://i.imgur.com/2zJ2clW.jpg"},
        {user_id:3, name: "Guitar", item_description:"Fender", date_started:"2020-04-27 16:34:01", date_ending:"2020-05-02 16:40:23", item_price:"300",image:"https://i.imgur.com/zQyowDJ.jpg"}
      ]);
    });
};
