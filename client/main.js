const socket = io();

const form = document.querySelector('form');
const inputName = prompt('What is your name?')
const name = inputName? inputName: 'Guest'
appendMessage('You joined');
socket.emit('new-user', name)

form.addEventListener('submit', function(e) {
  e.preventDefault();
  var input = document.querySelector('#message');
  var text = input.value;
  socket.emit('message', text);
  input.value = '';
});

socket.on('message', data => {
  appendMessage(`<b>${data.name}</b>: ${data.msg}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`);
});

function appendMessage(text) {
  if (!text) {
    return;
  }
  let container = document.querySelector('section');
  let newMessage = document.createElement('p');
  newMessage.innerHTML = text;
  container.appendChild(newMessage);
  let seperator = document.createElement('br');
  container.appendChild(seperator);
  container.scrollTop = container.scrollHeight;
}
