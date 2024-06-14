/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("group_members", function (table) {
    table.unique(["user_id", "group_id"]);
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("group_members", function (table) {
    table.dropUnique(["user_id", "group_id"]);
  });
};
