const express = require('express');
const mustacheExpress = require('mustache-express');
const usersObj = require('./data.js');
const users = usersObj.users;
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustacheExpress());
app.set('views', './public/');
app.set('view engine', 'mustache');

app.get('/', function (req, res) {
  res.render('index', usersObj);
});

let workFilter = function (users) {
  return users.job === null;
};
let eduFilter = function (users) {
  return users.university === null;
};

function userFilter (myFilters) {
  for (var i = 0; i < myFilters.length ; i++) {
    var myFilter = myFilters[i];
    var filteredUsers = users.filter(myFilter);
  }
  return filteredUsers;
}

app.get('/missing', function (req, res) {
  let myFilters = [eduFilter];
  var search = userFilter(myFilters);
  var results = {users: search};
  res.render('index', results);
});
app.get('/work', function (req, res) {
  let myFilters = [workFilter];
  var search = userFilter(myFilters);
  var results = {users: search};
  res.render('index', results);
});

app.listen(3000, function () {
  console.log('Express is listening for connections');
});