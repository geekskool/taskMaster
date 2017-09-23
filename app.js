const express = require('express')
const app = express()

const path = require('path')
const routes = require('./myRoutes.js')
app.set('views', path.join(__dirname, 'static/html'))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.send('something')
})

app.get(routes.login, function (req, res) {
  res.send('Login page')
})

app.get(routes.register, function (req, res) {
  res.send('Register Page')
})

app.get(routes.dashboard, function (req, res) {
  res.send('DashBoard/Home Page')
})

app.get(routes.tasks, function (req, res) {
  res.render('tasks', {title: 'tasks', message: 'Hello'})
})

app.get(routes.task, function(req, res) {
//  res.sendFile('Ind Task Page'+ req.params.id);
  
//  res.sendFile('static/html/task.html', {root: __dirname} )
  res.render('task', {task_id:1, task_title:'task one'})

});

app.get(routes.socketenter, function (req, res) {
  res.send('Socket Send Test Page')
})

app.get(routes.socketreceive, function (req, res) {
  res.send('Socket Receive Test Page')
})

app.listen(8000, function () {
  console.log('app running on 8000')
})
