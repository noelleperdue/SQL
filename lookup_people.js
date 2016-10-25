const pg = require("pg");
const settings = require("./settings.json"); // settings.json

const db = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

var name = process.argv[2];

const getFamousPerson = (name, callback) => {
  db.connect((err) => {
    if (err) {
    return console.error("Connection Error", err);
  }
  let query =
    `SELECT
    first_name,
    last_name,
    birthdate
    FROM famous_people
    WHERE last_name = $1::text`;

  db.query(query, [name], (err, result) => {

    if (err) {
      return console.error("error running query", err);
    }

  console.log(`Found ${result.rows.length} by the name '${name}'`);
  result.rows.forEach((row) => {
    let output = [];
    for (column in row) {
      output.push(`${row.birthdate}`);
    }
    console.log(output.join(', '));
  })
    db.end();
  });
});
};

getFamousPerson(name, (rows) => {
  console.log(name);
  console.log(rows);
  console.log(`Found ${rows.length}`);
  rows.forEach((row) => {
    let output = [];
    for (column in row) {
      output.push(`${column}: ${row[column]}`);
    }
    console.log(output.join(', '));
  })
});