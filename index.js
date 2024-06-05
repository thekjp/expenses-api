const express = require("express");
const app = express();
const cors = require("cors");
const groupsRouter = require("./routes/groups");
require("dotenv").config();
const { PORT, BASE_URL } = process.env;

//middleware
app.use(express.json());
app.use(cors());

//group route
app.use("/groups", groupsRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`);
});
