import database from "infra/database.js";
const appPort = process.env.APP_PORT;

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch(
    `http://localhost:${appPort}/api/v1/migrations`,
    {
      method: "DELETE",
    },
  );
  expect(response1.status).toBe(405);
});
