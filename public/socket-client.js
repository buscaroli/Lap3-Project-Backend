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

socket.on('hostStatus', (data) => {
  data.hostStatus === true
    ? console.log('You are the Host')
    : console.log(' You are NOT the host')
})
