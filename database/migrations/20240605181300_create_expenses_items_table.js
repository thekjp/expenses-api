/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("expense_items", function (table) {
    table.increments("id").primary();
    table.integer("expense_id").unsigned().notNullable();
    table.integer("user_id").unsigned().notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.timestamps(true, true);

    table
      .foreign("expense_id")
      .references("id")
      .inTable("expenses")
      .onDelete("CASCADE");

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
  return knex.schema.dropTable("expense_items");
};
