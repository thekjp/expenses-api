/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("expenses").del();

  // Inserts seed entries
  await knex("expenses").insert([
    { group_id: 1, title: "Dinner", total_amount: 100.0, date: "2024-05-21" },
    { group_id: 2, title: "Hotel", total_amount: 200.0, date: "2024-05-22" },
  ]);
};
