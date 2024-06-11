const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

// Fake authentication middleware
const fakeAuthMiddleware = (req, res, next) => {
  // Simulate an authenticated user by adding a userId to the request object
  req.user = { id: 1 };
  next();
};

// Apply the fake authentication middleware
router.use("/", fakeAuthMiddleware);

//get all expenses owed for a logged in user
router.get("/your-expenses", async (req, res) => {
  try {
    const userId = req.user.id;
    const userExpenses = await knex("expenses").where("user_id", userId).select(
      "id as expense_id", //add alias to make id clearer
      "title",
      "total_amount",
      "date",
      "created_at",
      "updated_at"
    );
    if (userExpenses.length === 0) {
      res.status(404).json({ message: "No expenses found for the user." });
    } else {
      res.json(userExpenses);
    }
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
});

//get all expenses for a group
router.get("/group/:groupId", async (req, res) => {
  try {
    const expenses = await knex("expenses").where({
      group_id: req.params.groupId,
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get expense by ID
router.get("/:id", async (req, res) => {
  try {
    const expense = await knex("expenses").where({ id: req.params.id }).first();
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: "Expense not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add an expense to a group
router.post("/", async (req, res) => {
  try {
    const { group_id, title, total_amount, date, items } = req.body;
    const [expenseId] = await knex("expenses").insert({
      group_id,
      title,
      total_amount,
      date,
    });
    for (const item of items) {
      await knex("expense_items").insert({
        expense_id: expenseId,
        user_id: item.user_id,
        amount: item.amount,
      });
    }
    const newExpense = await knex("expenses").where({ id: expenseId }).first();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add an expense to a user
router.post("/user", async (req, res) => {
  try {
    const { userId, title, totalAmount, date } = req.body;
    await knex("expenses").insert({
      user_id: userId,
      title,
      total_amount: totalAmount,
      date,
    });

    res.status(201).json({ message: "Expense added successfully" });
  } catch (error) {
    console.log(error);
    console.error("Error adding expense: ", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
});

//update expense details
router.put("/:id", async (req, res) => {
  try {
    const { title, total_amount, date, items } = req.body;
    await knex("expenses")
      .where({ id: req.params.id })
      .update({ title, total_amount, date });
    await knex("expense_items").where({ expense_id: req.params.id }).del();
    for (const item of items) {
      await knex("expense_items").insert({
        expense_id: req.params.id,
        user_id: item.user_id,
        amount: item.amount,
      });
    }
    const updatedExpense = await knex("expenses")
      .where({ id: req.params.id })
      .first();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete an expense from a group
router.delete("/:id", async (req, res) => {
  try {
    await knex("expenses").where({ id: req.params.id }).del();
    await knex("expense_items").where({ expense_id: req.params.id }).del();
    res.json({ message: "Expense successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
