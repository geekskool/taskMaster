const express = require('express');
const app = express();

const path = require('path');
const routes = require('./myRoutes.js');

app.get('/', function(req, res) {
  res.send('something');
});

app.get(routes.login, function(req, res) {
  res.send('Login page');
});

app.get(routes.register, function(req, res) {
  res.send('Register Page');
});

app.get(routes.dashboard, function(req, res) {
  res.send('DashBoard/Home Page');
});

app.get(routes.tasks, function(req, res) {
  res.send('All Tasks Page');
});

app.get(routes.task, function(req, res) {
  res.send('Ind Task Page');
});

app.get(routes.socketenter, function(req, res) {
  res.send('Socket Send Test Page');
});

app.get(routes.socketreceive, function(req, res) {
  res.send('Socket Receive Test Page');
});


app.listen(8000, function() {
  console.log('app running on 8000');
});
