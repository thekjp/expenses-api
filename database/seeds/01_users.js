/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { username: "Paul", email: "paul@outlook.com" },
    { username: "John", email: "john@icloud.com" },
    { username: "Jodie", email: "jodie@gmail.com" },
  ]);
};
