
exports.up = function(knex) {
  return knex.schema.createTable('user', tbl =>{
      tbl.increments();
      tbl.string('username', 128)
      tbl.notNullable()
      tbl.unique();

      tbl.string('password',128)
      tbl.notNullable();

      tbl.string('first_name',128)
      tbl.notNullable();

      tbl.string('last_name',128)
      tbl.notNullable();

      tbl.string('email', 128)
      tbl.unique()
      tbl.notNullable();
  })
  .createTable('auctions',tbl =>{
      tbl.increments()
      tbl.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('user');
      tbl.string('name', 128)
      .notNullable();
    tbl.string('item_description', 1000)
    tbl.integer('item_price')
      .notNullable();
    tbl.date('date_started')
      .notNullable();
    tbl.date('date_ending')
      .notNullable();
    tbl.string('images', 500)
      .notNullable();
  })
  .createTable('auction_bids', tbl =>{
  tbl.increments();
  tbl.integer('user_id')
    .notNullable()
    .references("id")
    .inTable('users');
  tbl.integer('auction_id')
    .unsigned()
    .notNullable()
    .references("id")
    .inTable('auctions')
  tbl.integer('price')
    .unsigned()
    .notNullable();
  tbl.date('date_listed')
    .notNullable();
})
};

exports.down = function(knex) {
  return knex.schema
            .dropTableIfExists('auction_bids')
            .dropTableIfExists('auctions')
            .dropTableIfExists('user')
};
