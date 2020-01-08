const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'nov25_w5d1'
});

client.connect();

module.exports = client;
