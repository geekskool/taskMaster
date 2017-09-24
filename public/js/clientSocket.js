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
  
  const updateTable = (data) => {
    const taskTable = document.getElementById('taskTable')
    let rowCount = taskTable.rows.length
    let row = taskTable.insertRow(rowCount)
    row.insertCell(0).innerHTML = rowCount
    row.insertCell(1).innerHTML = data.task.title
    row.insertCell(2).innerHTML = data.status
    row.insertCell(3).innerHTML = data.task.assignedTo
    row.insertCell(4).innerHTML = data.task.dueDate
  }

})
