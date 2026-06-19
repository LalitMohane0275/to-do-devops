const express = require("express");

const { createTodo, getTodos, updateTodo } = require("../controllers/todoController");

const router = express.Router();

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);

module.exports = router;