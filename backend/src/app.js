const express = require("express");
const cors = require("cors");

const app = express();

const todoRoutes = require("./routes/todoRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Todo DevOps API Running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
  });
})

module.exports = app;