const express = require('express')
const app = express()
const bodyParser = require("body-parser")

const path = require('path')
const routes = require('./myRoutes.js')
const tasks = require('./data/tasks');
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')
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
  res.render('dashboard', tasks);
});

app.get(routes.createtask, function (req, res) {
  res.render('createtask', {})
})

app.post(routes.createtask, function (req, res) {
  res.send({
    name: req.body.title,
    desc: req.body.description,
    assignedto: req.body.assignedTo,
    duedate: req.body.dueDate
  })
})

app.get(routes.tasks, function (req, res) {
  res.render('tasks', {
    title: 'tasks',
    message: 'Hello',
    tasks: tasks
  })
})

app.get(routes.task, function (req, res) {
  //  res.sendFile('Ind Task Page'+ req.params.id);

  //  res.sendFile('static/html/task.html', {root: __dirname} )
  res.render('task', {
    task_id: req.params.id,
    task_title: 'task one'
  })

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
