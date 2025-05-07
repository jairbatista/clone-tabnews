import orchestrator from "tests/orchestrator.js";
const appPort = process.env.APP_PORT;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(`http://localhost:${appPort}/api/v1/status`);
  expect(response.status).toBe(200);

  // responseBody
  const responseBody = await response.json();

  // responseBody.updated_at
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // responseBody.dependencies.database.version
  expect(responseBody.dependencies.database.version).toEqual("16.8");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});
