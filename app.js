const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const pgPromise = require('pg-promise')();

const database = pgPromise({ database: 'robots' });

//***** CREATE TABLE STATEMENT*****
//CREATE TABLE robots ("id" SERIAL PRIMARY KEY);
//
// ALTER TABLE robots
// ADD COLUMN "username" VARCHAR(100) ,
// ADD COLUMN "imageurl" VARCHAR(300),
// ADD COLUMN "email" VARCHAR(100),
// ADD COLUMN "university" VARCHAR(100),
// ADD COLUMN "street_number" INTEGER(10),
// ADD COLUMN "address" VARCHAR(100),
// ADD COLUMN "city" VARCHAR(100),
// ADD COLUMN "state" VARCHAR(100),
// ADD COLUMN "job" VARCHAR(100),
// ADD COLUMN "company" VARCHAR(100),
// ADD COLUMN "postal_code" VARCHAR(100),
// ADD COLUMN "year_built" INTEGER(10),
// ADD COLUMN "next_service_date" DATE,
// ADD COLUMN "is_active" BOOLEAN;

app.use(express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/index/', (req, res) => {
  database.any('SELECT * FROM "robots"').then(rows => {
    res.render('index', { id: rows });
  });
});

app.get('/user/:name', (req, res) => {
  function findPerson(person) {
    return person.username === req.params.username;
  }
  var persons = database.id.find(findPerson);
  res.render('user', persons);
});

app.listen(3000, function() {
  console.log('Running');
});
