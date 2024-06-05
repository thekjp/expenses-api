const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// get array of groups
router.get("/", (req, res) => {
  res.json("groups page");
});

module.exports = router;
