/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("expenses", function (table) {
    table.increments("id").primary();
    table.integer("group_id").unsigned().notNullable();
    table.string("title", 255).notNullable();
    table.decimal("total_amount", 10, 2).notNullable();
    table.date("date").notNullable();
    table.timestamps(true, true);

    table
      .foreign("group_id")
      .references("id")
      .inTable("groups")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("expenses");
};
