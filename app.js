const express = require('express')
const app = express()

const path = require('path')
const routes = require('./myRoutes.js')
const tasks = require('./data/tasks')
app.set('views', path.join(__dirname, 'public/views'))
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
  res.render('tasks', {title: 'tasks', message: 'Hello', tasks: tasks})
})

app.get(routes.task, function (req, res) {
  res.render('task', {task_id:req.params.id, task_title:'task one', })
});

app.post(routes.task, function (req, res) {
  let task_id = req.params.id
  let title = req.params.title
  let desc = req.params.desc
  let status = req.params.status
  let assignBy = req.params.assgnBy
  let createdOn = req.params.createdOn
  let dueDate = req.params.dueDate
  res.send('task', {task_id:req.params.id, task_title:'task one', })
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
