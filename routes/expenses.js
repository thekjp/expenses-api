const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

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
    res.status(500).json({ error: message });
  }
});

module.exports = router;
