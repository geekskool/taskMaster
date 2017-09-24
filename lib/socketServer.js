const socketio = require('socket.io')
const data = require('../data/tasks')
exports.listen = function (server) {
  io = socketio.listen(server)
  io.sockets.on('connection', function (socket) {
    console.log('Connection created')
    createTask(socket)
    displayAllTask(socket)
  })

  const createTask = (socket) => {
    socket.on('createTask', (task) => {
      let counter = ++(data.seq)
      data['tasks'][counter] = {
        title: task.title,
        desc: task.description,
        status: 'new',
        assgnBy: 'current',
        assgnTo: task.assignedTo,
        createdOn: new Date().toISOString(),
        dueDate: task.dueDate
      }
      io.emit('updateTaskList', {task: task, status: 'new'})
    })
  }

  const displayAllTask = (socket) => {
    socket.on('populateAllTask', (data) => {
      socket.emit('displayAllTask', data)
    })
  }

}
