const express = require('express')
const app = express()
const bodyParser = require("body-parser")

const path = require('path')
const routes = require('./myRoutes.js')

const data = require('./data/tasks')

app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')

let counter = 0
app.use(bodyParser.urlencoded({
  extended: true
}))

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
  res.render('dashboard', data)
})

app.get(routes.createtask, function (req, res) {
  res.render('createtask', {})
})

app.post(routes.createtask, function (req, res) {
++counter
  data['tasks'][counter] = {
    title: req.body.title,
    desc: req.body.desc,
    status: 'new',
    assgnBy: 'current',
    assgnTo: req.body.assgnTo,
    createdOn: new Date().toISOString(),
    dueDate: req.body.dueDate
  }
  res.redirect('/dashboard')
})

app.get(routes.tasks, function (req, res) {
  res.render('tasks', {title: 'tasks', message: 'Hello', tasks: data.tasks})
})

app.get(routes.task, function (req, res) {
  tasksJson = data.tasks[req.params.id]
  console.log(tasksJson)
  if(tasksJson === undefined) throw 'Invalid Task ID'
  res.render('task', tasksJson)
});

app.post(routes.task, function (req, res) {
  let [task_id, title, desc, status, assignBy, createdOn, dueDate] = [req.body.id, req.body.title, req.body.desc, req.body.status, req.body.assgnBy, req.body.createdOn, req.body.dueDate]
  console.log(task_id, title, desc, status, assignBy, createdOn, dueDate)
  // res.send(task_id, title, desc, status, assignBy, createdOn, dueDate)
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
