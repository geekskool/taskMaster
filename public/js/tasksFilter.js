const filterType = document.getElementById('filterType')
filterType.onSelect = (event) => {
  console.log('filterType = ', event.target.value)
}
