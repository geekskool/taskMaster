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

  socket.on('updateTaskList', task => {
    updateTable(task)
  })

  const updateTable = (task) => {
    const taskTable = document.getElementById('taskTable')
    console.log('taskTable = ', taskTable)
    let rowCount = taskTable.rows.length
    console.log('rowCount = ', rowCount)
    let row = taskTable.insertRow(rowCount)
    row.insertCell(0).innerHTML = rowCount
    row.insertCell(1).innerHTML = task.title
    row.insertCell(1).innerHTML = task.status
    row.insertCell(2).innerHTML = task.assignedTo
    row.insertCell(3).innerHTML = task.dueDate
  }

})
