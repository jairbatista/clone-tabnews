test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  // responseBody
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  // responseBody.updated_at
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // responseBody.dependencies.database.max_connections
  const databaseMaxConnections =
    responseBody.dependencies.database.max_connections;
  expect(databaseMaxConnections).toEqual(100);

  // responseBody.dependencies.database.open_connections
  const databaseOpenConnections =
    responseBody.dependencies.database.open_connections;
  expect(typeof databaseOpenConnections).toBe("number");
  expect(Number.isInteger(databaseOpenConnections)).toBe(true);
  expect(databaseOpenConnections).toBeGreaterThan(0);

  // responseBody.dependencies.database.version
  const databaseVersion = responseBody.dependencies.database.version;
  expect(databaseVersion).toBeDefined();
  expect(databaseVersion).toContain("16.8");
});
