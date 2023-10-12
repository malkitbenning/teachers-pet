const { Client } = require("pg");

const client = new Client({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  port: process.env.DBPORT,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
  ssl: true,
});

client.connect(function (err) {
  if (err) throw err;
});

module.exports = client;

