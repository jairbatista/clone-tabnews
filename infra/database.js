import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: "localhost",
    database: "postgres",
    password: "local_password",
    user: "postgres",
    port: 5432,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query: query,
};
