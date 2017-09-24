const socketio = require('socket.io')
const data = require('../data/tasks')
let counter = 0
exports.listen = function (server) {
  io = socketio.listen(server)
  io.sockets.on('connection', function (socket) {
    console.log('Connection created')
    createTask(socket)
    displayAllTask(socket)
  })

  const createTask = (socket) => {
    socket.on('createTask', (data) => {
      console.log('DB call-->', data.title, data.description, data.assignedTo, data.dueDate)
      //++counter
      let counter = ++data.seq
      console.log('Counter = ', counter)
      data['tasks'][counter] = {
        title: data.title,
        desc: data.description,
        status: 'new',
        assgnBy: 'current',
        assgnTo: data.assignedTo,
        createdOn: new Date().toISOString(),
        dueDate: data.dueDate
      }
      io.emit('updateTaskList', data)
    })
  }

  const displayAllTask = (socket) => {
    socket.on('populateAllTask', (data) => {
      socket.emit('displayAllTask', data)
    })
  }

}
