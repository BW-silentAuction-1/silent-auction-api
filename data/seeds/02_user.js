const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {username: "Test1", password: bcrypt.hashSync("password", 12), first_name: "Seller", last_name: "List", email: "test1@cool.com"},
        {username: "Test2", password: bcrypt.hashSync("password", 12), first_name: "Seller", last_name: "List", email: "test2@cool.com"},
        {username: "Test3", password: bcrypt.hashSync("password", 12), first_name: "Seller", last_name: "List", email: "test3@cool.com"}
      ]);
    });
};
