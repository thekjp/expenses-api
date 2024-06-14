/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("expenses").del();

  // Inserts seed entries
  await knex("expenses").insert([
    [
      {
        name: "Dinner At Jacks",
        amount: 200.0,
        date: "2024-03-03",
      },
      {
        name: "Dinner At Joey's",
        amount: 255.0,
        date: "2024-03-18",
      },
      {
        name: "Dinner At Joeys",
        amount: 200.0,
        date: "2024-06-15",
      },
      {
        name: "Sushi",
        amount: 50.0,
        date: "2024-06-08",
      },
      {
        name: "Drinks At Keefer Bar",
        amount: 250.0,
        date: "2024-06-14",
      },
      {
        name: "Breakfast At Jam Cafe",
        amount: 325.0,
        date: "2024-06-14",
      },
      {
        name: "Drinks At Cactus",
        amount: 58.0,
        date: "2024-06-01",
      },
      {
        name: "Drinks At Blue",
        amount: 65.0,
        date: "2024-06-02",
      },
    ],
  ]);
};
