const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const data = require('./data.js');
const pgPromise = require('pg-promise')();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/index/', (req, res) => {
  database.any('SELECT * FROM "robots"').then(rows => {
    res.render('index', { id: rows });
  });
});

app.get('/user/:id', (req, res) => {
  const urlID = parseInt(req.params.id);
  database
    .one('SELECT * FROM "robots" WHERE id = $(id)', { id: urlID })
    .then(person => {
      res.render('user', person);
    })
    .catch(error => {
      res.render('newuser');
    });
});

app.post('/newuser', (req, res) => {
  req.checkBody('username', 'Username cannot be blank').notEmpty();
  req.checkBody('email', 'Email cannot be blank').notEmpty();
  req.checkBody('street_number', 'Street number cannot be blank and must be numeric').notEmpty().isNumeric();
  req.checkBody('address', 'Address cannot be blank').notEmpty();
  req.checkBody('city', 'City cannot be blank').notEmpty();
  req.checkBody('state', 'State cannot be blank').notEmpty();
  req.checkBody('postal_code', 'Postal code cannot be blank and must be numeric').notEmpty().isNumeric();
  req.checkBody('year_built', 'Year built cannot be blank and must be numeric').notEmpty().isNumeric();
  req.checkBody('next_service_date', 'Next service date cannot be blank').notEmpty();
  req.checkBody('is_active', 'Is active cannot be blank');

  var errors = req.validationErrors();
  if (errors) {
    res.render('newuser', { errors });
  } else {
    const newUser = {
      userName: req.body.username,
      imageUrl: req.body.imageurl || null,
      email: req.body.email,
      university: req.body.university || null,
      streetNumber: req.body.street_number,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      job: req.body.job || null,
      company: req.body.company || null,
      postalCode: req.body.postal_code,
      yearBuilt: req.body.year_built,
      nextServiceDate: req.body.next_service_date,
      isActive: req.body.is_active
    };

    database
      .one(
        `INSERT INTO "robots" ("username", "imageurl", "email", "university", "street_number", "address", "city", "state", "job", "company", "postal_code", "year_built", "next_service_date", "is_active") VALUES ($(userName), $(imageUrl), $(email), $(university), $(streetNumber), $(address), $(city), $(state), $(job), $(company), $(postalCode), $(yearBuilt), $(nextServiceDate), $(isActive)) RETURNING id`,
        newUser
      )
      .then(newUser => {
        res.redirect('/index');
      })
      .catch(error => {
        console.log('Something went wrong!');
      });
  }
});

app.delete('/user/:id', (request, response) => {
  const id = request.params.id;
  database.one(`DELETE FROM "robots" WHERE id = $1`, [id]).then(robot => {
    response.redirect('/index');
  });
});

app.listen(3000, function() {
  console.log('Running');
});
