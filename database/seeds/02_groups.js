/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("groups").del();

  // Inserts seed entries
  await knex("groups").insert([
    { name: "Trip to Paris" },
    { name: "Family Vacation" },
  ]);
};
