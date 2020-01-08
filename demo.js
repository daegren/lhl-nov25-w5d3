const { Client } = require('pg');

const arg = process.argv.slice(2)[0];
if (!arg) {
  console.log('Must provide an id to lookup');
  process.exit(1);
  return;
}

const client = new Client({
  // 'postgres://postgres:postgres@localhost/nov25_w5d1'
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'nov25_w5d1'
});

client.connect();

const query = `SELECT projects.name, count(tasks.id) as task_count 
  FROM projects
  JOIN tasks ON projects.id = tasks.project_id
  WHERE projects.id = $1
  GROUP BY projects.name;`;

// console.log(query);
// return;

client.query(query, [arg])
  .then(result => {
    console.log('Got some results!');
    console.log(result);
    result.rows.forEach((row) => console.log(row));
  })
  .catch(err => {
    console.log('Got an error!');
    console.error(err);
  })
  .finally(() => {
    client.end();
  });
