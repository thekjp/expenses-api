const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

//get all users
router.get("/", async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await knex("users").where({ id: req.params.id }).first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a new user
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("users").insert(req.body);
    const newUser = await knex("users").where({ id }).first();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update a user
router.put("/:id", async (req, res) => {
  try {
    await knex("users").where({ id: req.params.id }).update(req.body);
    const updatedUser = await knex("users")
      .where({ id: req.params.id })
      .first();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete a user
router.delete("/:id", async (req, res) => {
  try {
    await knex("users").where({ id: req.params.id }).del();
    res.json({ message: "User successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
