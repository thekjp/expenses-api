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

// get all groups for logged in user
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const groups = await knex("groups")
      .join("group_members", "groups.id", "group_members.group_id")
      .where("group_members.user_id", userId)
      .select("groups.*");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get group by ID
router.get("/:id", async (req, res) => {
  try {
    const group = await knex("groups").where({ id: req.params.id }).first();
    if (group) {
      const members = await knex("group_members")
        .join("users", "group_members.user_id", "users.id")
        .where("group_members.group_id", req.params.id)
        .select("users.id", "users.username");
      const expenses = await knex("expenses").where({
        group_id: req.params.id,
      });
      res.json({ ...group, members, expenses });
    } else {
      res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//create a new group
router.post("/", async (req, res) => {
  try {
    const [id] = await knex("groups").insert(req.body);
    const newGroup = await knex("groups").where({ id }).first();
    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//add a member to a group
router.post("/:id/members", async (req, res) => {
  try {
    const { user_id } = req.body;
    const group_id = req.params.id;
    await knex("group_members").insert({ user_id, group_id, role: "member" });
    const newMember = await knex("group_members")
      .join("users", "group_members.user_id", "users.id")
      .where({ user_id, group_id })
      .first();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update group details
router.put("/:id", async (req, res) => {
  try {
    await knex("groups").where({ id: req.params.id }).update(req.body);
    const updatedGroup = await knex("groups")
      .where({ id: req.params.id })
      .first();
    res.json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete a group
router.delete("/:id", async (req, res) => {
  try {
    await knex("groups").where({ id: req.params.id }).del();
    res.json({ message: "Group successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
