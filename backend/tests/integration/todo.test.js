require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../../src/app");
const connectDB = require("../../src/config/db");
const Todo = require("../../src/models/Todo");

// Establish database connection before running tests
beforeAll(async () => {
  await connectDB();
});

describe("Todo API", () => {
  let todoId;

  // Unique title to avoid conflicts between test runs
  const testTitle = `Test Todo ${Date.now()}`;

  // Test: Create Todo
  test("POST /api/todos should create a todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        title: testTitle,
      });

    // Save id for update/delete tests
    todoId = response.body.data._id;

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe(testTitle);
    expect(response.body.data.completed).toBe(false);
  });

  // Test: Validation when title is missing
  test("POST /api/todos should fail when title is missing", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({});
      
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  // Test: Validation when title contains only spaces
  test("POST /api/todos should fail for empty title", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({
        title: "    ",
      });
      
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  // Test: Fetch all todos
  test("GET /api/todos should return all todos", async () => {
    const response = await request(app).get("/api/todos");
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  // Test: Update existing todo
  test("PUT /api/todos/:id should update todo", async () => {
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({
        completed: true,
      });
      
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.completed).toBe(true);
  });

  // Test: Update non-existent todo
  test("PUT /api/todos/:id should return 404 for invalid id", async () => {
    const response = await request(app)
      .put("/api/todos/685000000000000000000000")
      .send({
        completed: true,
      });

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  // Test: Delete existing todo
  test("DELETE /api/todos/:id should delete todo", async () => {
    const response = await request(app)
      .delete(`/api/todos/${todoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  // Test: Delete non-existent todo
  test("DELETE /api/todos/:id should return 404 for invalid id", async () => {
    const response = await request(app)
      .delete("/api/todos/685000000000000000000000");

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  // Test: Verify deleted todo no longer exists
  test("Deleted todo should not exist", async () => {
    const response = await request(app).get("/api/todos");

    const found = response.body.data.find(
      (todo) => todo._id === todoId
    );

    expect(found).toBeUndefined();
  });
});

// Cleanup test data and close DB connection
afterAll(async () => {
  await Todo.deleteMany({
    title: /^Test Todo/,    
  });

  await mongoose.connection.close();
});