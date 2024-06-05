const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { PORT, BASE_URL } = process.env;

//middleware
app.use(express.json());
app.use(cors());

//route handlers
const userRoutes = require("./routes/users");
const groupRoutes = require("./routes/groups");
const expensesRoutes = require("./routes/expenses");

//routes
app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${BASE_URL}:${PORT}`);
});
