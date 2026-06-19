require("dotenv").config();
const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const connectDB = require("../../src/config/db");

beforeAll(async () => {
  console.log(process.env.MONGO_URI);

  await connectDB();
});

describe("Todo API", () => {
    const testTitle = `Test Todo ${Date.now()}`;

    test("POST /api/todos should create a todo", async () => {
        const response = await request(app)
        .post("/api/todos")
        .send({
            title: testTitle,
        });

    expect(response.statusCode).toBe(201);

    expect(response.body.success).toBe(true);

    expect(response.body.data.title).toBe(testTitle);

    expect(response.body.data.completed).toBe(false);
  });

  test("POST /api/todos should fail when title is missing", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({});

    expect(response.statusCode).toBe(400);

    expect(response.body.success).toBe(false);
  });

  test("GET /api/todos should return all todos", async () => {
    const response = await request(app)
      .get("/api/todos");

    expect(response.statusCode).toBe(200);

    expect(response.body.success).toBe(true);

    expect(Array.isArray(response.body.data)).toBe(true);
  });

});

afterAll(async () => {
  await mongoose.connection.close();
});