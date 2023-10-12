const { Client } = require("pg");

const client = new Client({
  host: process.env.DBHOST = "dpg-ckdhmcsiibqc73en6brg-a.frankfurt-postgres.render.com",
  user: process.env.DBUSER ="malkit",
  port: process.env.DBPORT="5432",
  password: process.env.DBPASSWORD = "SKEgWDHY6Ero7u4qNVmpAOwlDE9tfklm",
  database: process.env.DBDATABASE="teachers_pet_db",
  ssl: true,
});

client.connect(function (err) {
  if (err) throw err;
});

module.exports = client;

