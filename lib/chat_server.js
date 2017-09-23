const socketio = require('socket.io')

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
    })
  }

  const displayAllTask = (socket) => {
    socket.on('populateAllTask', (data) => {
      socket.emit('displayAllTask', data)
    })
  }

  wdfv
}
