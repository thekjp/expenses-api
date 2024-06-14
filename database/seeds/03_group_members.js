/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("group_members").del();

  // Inserts seed entries
  await knex("group_members").insert([
    { user_id: 1, group_id: 1, role: "admin" },
    { user_id: 2, group_id: 1, role: "member" },
    { user_id: 3, group_id: 2, role: "admin" },
  ]);
};
