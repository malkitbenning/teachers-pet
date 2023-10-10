const { Client } = require("pg");


const client = new Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBDATABASE,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  ssl: true,
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log("Connected to the PostgreSQL database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

module.exports = { client, connectDatabase };
