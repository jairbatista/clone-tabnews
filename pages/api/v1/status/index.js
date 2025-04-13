import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  // postgres maxConnections
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnections = parseInt(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  // postgres openConnections
  const databaseOpenConnectionsResult = await database.query(
    "SELECT COUNT(1) FROM pg_stat_activity;",
  );
  const databaseOpenConnections = parseInt(
    databaseOpenConnectionsResult.rows[0].count,
  );

  // postgres version
  const databaseVersionResult = await database.query("SELECT version();");
  const databaseVersion = databaseVersionResult.rows[0].version;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: databaseMaxConnections,
        open_connections: databaseOpenConnections,
        version: databaseVersion,
      },
    },
  });
}

export default status;
