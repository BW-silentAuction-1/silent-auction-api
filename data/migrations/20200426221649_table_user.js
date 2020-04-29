
exports.up = function(knex) {
  return knex.schema.createTable('user', tbl =>{
      tbl.increments();
      tbl.string('username', 128).notNullable().unique();

      tbl.string('password',128).notNullable();

      tbl.string('first_name',128).notNullable();

      tbl.string('last_name',128).notNullable();

      tbl.string('email', 128).unique().notNullable();
  })

  .createTable('auctions',tbl =>{
      tbl.increments()
      tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('user')
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
      tbl.string('name', 128)
      .notNullable();
    tbl.string('item_description', 1000)
    tbl.float('item_price')
      .notNullable();
    tbl.datetime('date_started')
      .notNullable();
    tbl.datetime('date_ending')
      .notNullable();
    tbl.string('image', 500)
      .notNullable();
  })
  .createTable('auction_bids', tbl =>{
  tbl.increments();
  tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references("id")
    .inTable('user')
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  tbl.integer('auction_id')
    .unsigned()
    .notNullable()
    .references("id")
    .inTable('auctions')
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  tbl.float('price')
    .unsigned()
    .notNullable();
  tbl.datetime('date_listed')
    .notNullable();
})
};

exports.down = function(knex) {
  return knex.schema
            .dropTableIfExists('auction_bids')
            .dropTableIfExists('auctions')
            .dropTableIfExists('user')
};
