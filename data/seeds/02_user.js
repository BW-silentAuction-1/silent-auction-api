
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: "Test", password: bcrypt.hashSync("password", 12), first_name: "Seller", last_name: "List", item_description: true},
        {username: "Test", password: bcrypt.hashSync("password", 12), first_name: "Seller", last_name: "List", item_description: true},
        {username: "Test", password: bcrypt.hashSync("password", 12), first_name: "Seller", last_name: "List", item_description: true}
      ]);
    });
};
