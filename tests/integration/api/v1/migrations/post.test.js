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
      method: "POST",
    },
  );
  expect(response1.status).toBe(201);
  const response1Body = await response1.json();
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch(
    `http://localhost:${appPort}/api/v1/migrations`,
    {
      method: "POST",
    },
  );
  expect(response2.status).toBe(200);
  const response2Body = await response2.json();
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);

  const { rows: migrationTableCheck } = await database.query(`
    SELECT to_regclass('pgmigrations') AS exists;
  `);
  expect(migrationTableCheck[0].exists).toBe("pgmigrations");
});
