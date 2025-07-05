import database from "infra/database.js";
import orchestrator from "tests/orchestrator.js";
const appPort = process.env.APP_PORT;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch(
    `http://localhost:${appPort}/api/v1/migrations`,
    {
      method: "DELETE",
    },
  );
  expect(response1.status).toBe(405);
});
