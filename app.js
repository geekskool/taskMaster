const express = require('express')
const app = express()
const http = require('http').Server(app)
const bodyParser = require('body-parser')
const session = require('express-session')

const path = require('path')
const routes = require('./myRoutes.js')
const helper = require('./myUtils')

const data = require('./data/tasks')
// console.log('data = ', data)
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'pug')

// session confs
app.use(session({
  secret: 'some-very-very-long-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

let counter = 0
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/', function (req, res) {
  res.render('homepage', {})
})

app.get(routes.login, function (req, res) {
  if(req.session.user !== undefined)
    return res.redirect('/dashboard')
  res.render('login', {})
})

app.post(routes.login, function (req, res) {
  if(!helper.sanitize(req.body))
    res.send(helper.displayError('All input fields are required', req.body));
  const username = req.body.username;
  const password = req.body.password;
  if (helper.authenticate(username, password)) {
    req.session.user = {username: username}
    res.redirect('/dashboard');
  } else {
    res.send(helper.displayError('Username/Password incorrect', req.body))
  }
})

app.get(routes.register, function (req, res) {
  res.render('register', {})
})

app.post(routes.register, function (req, res) {
  if(!helper.sanitize(req.body)) {
    res.send(helper.displayError('All fields required', req.body))
  }
  const username = req.body.username
  const password = req.body.password
  // change it with appropriate db reg function
  console.log(username, password)
  res.redirect('/dashboard')
})


app.get(routes.dashboard, function (req, res) {
  console.log(req.session.user);
  res.render('dashboard', data)
})

app.get(routes.createtask, function (req, res) {
  res.render('createTask', {})
})

app.post(routes.createtask, function (req, res) {
  if(!helper.sanitize(req.body))
    res.send(helper.displayError('All fields are required',  req.body));

  data[data] = {}
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
  // console.log(task_id, title, desc, status, assignBy, createdOn, dueDate)
  res.send(task_id+" "+title+" "+desc+" "+status+" "+assignBy+" "+createdOn+" "+dueDate)
});
app.get(routes.socketenter, function (req, res) {
  res.send('Socket Send Test Page')
})

app.get(routes.socketreceive, function (req, res) {
  res.send('Socket Receive Test Page')
})

http.listen(8000, function () {
  console.log('app running on 8000')
})
const socket = require('./lib/socketServer')
socket.listen(http)
