document.addEventListener('DOMContentLoaded', function () {
  const socket = io.connect()
  const title = document.getElementById('title')
  const description = document.getElementById('description')
  const assignedTo = document.getElementById('assignedTo')
  const dueDate = document.getElementById('dueDate')
  const createTask = document.getElementById('createTask')


  createTask.onclick = () => {
    console.log('title = ', title.value, ' description = ', description.value)
    socket.emit('createTask', {
      title: title.value,
      description: description.value,
      assignedTo: assignedTo.value,
      dueDate: dueDate.value
    })
    return false
  }

  socket.on('displayData', tasks => {

  })
})
