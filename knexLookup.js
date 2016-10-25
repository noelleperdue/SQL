const settings = require("./settings.json");
const db = require("knex")({
  client: "pg",
    connection: {
    user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});
// let db = knex({
//   client: "pg",
//   connection: {
//     user     : settings.user,
//   password : settings.password,
//   database : settings.database,
//   host     : settings.hostname,
//   port     : settings.port,
//   ssl      : settings.ssl
//   }
// })
// settings.json



var name = process.argv[2];

//LECTURE
db.select("first_name").from("famous_people").then(function(results) {
  console.log(results)
})


var query = db.select("last_name").from("famous_people");
console.log(query.toSQL().sql)

db('famous_people').where({
  last_name: name
}).select().then(
function(results){
  console.log(results)
})

// var params = {"artist": "explosions"};
// var params2 = {"album": "Discovery"};

var query = db.select("last_name").from("famous_people");

// if(params) {
//   query = query.innerJoin("albums", "tracks.album_id". "famous_people.id").innerJoin{"artists", "albums.artists_id", "artists.id".where({
//     "artist.name":params["artist"] });
//   }
  query.then(function(results) {
    console.log(results)


  db.destroy();
})



//LECTURE END

// const getFamousPerson = (name, callback) => {
//   db.connect((err) => {
//     if (err) {
//     return console.error("Connection Error", err);
//   }
//   let query =
//     `SELECT
//     first_name,
//     last_name,
//     birthdate
//     FROM famous_people
//     WHERE last_name = $1::text`;

//   db.query(query, [name], (err, result) => {

//     if (err) {
//       return console.error("error running query", err);
//     }

//   console.log(`Found ${result.rows.length} by the name '${name}'`);
//   result.rows.forEach((row) => {
//     let output = [];
//     for (column in row) {
//       output.push(`${row.birthdate}`);
//     }
//     console.log(output.join(', '));
//   })
//     db.end();
//   });
// });
// };

// getFamousPerson(name, (rows) => {
//   console.log(name);
//   console.log(rows);
//   console.log(`Found ${rows.length}`);
//   rows.forEach((row) => {
//     let output = [];
//     for (column in row) {
//       output.push(`${column}: ${row[column]}`);
//     }
//     console.log(output.join(', '));
//   })
// });