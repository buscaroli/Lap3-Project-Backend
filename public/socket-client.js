let socket = io({
  query: {
    name: 'Sally',
  },
})

let form = document.getElementById('form')
let input = document.getElementById('input')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  if (input.value) {
    socket.emit('chat message', input.value)
    input.value = ''
  }
})

const controls = document.querySelector('.hostControls')

socket.on('hostStatus', (data) => {
  if (data.hostStatus === true) {
    console.log('You are the Host')
  } else {
    console.log(' You are NOT the host')
    controls.classList.add('disabled')
  }
})

socket.on('playerHasLeft', () => {
  console.log('Player has left')
})

socket.on('hostHasLeft', ({ id }) => {
  console.log('Host has left')
  console.log('new host id: ', id)
  console.log('player id: ', socket.id)
  if (id === socket.id) controls.classList.remove('disabled')
})
