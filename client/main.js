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
  appendMessage(data.name, data.msg);
});

socket.on('user-connected', name => {
  appendMessage(name, 'has connected to the room');
});

socket.on('user-disconnected', name => {
  appendMessage(name, 'has disconnected');
});

function appendMessage(name, text) {
  if (!text) {
    return;
  }
  let container = document.querySelector('section');
  let message = document.createElement('span');
  let author = document.createElement('span');
  let newMessage = document.createElement('p');
  author.innerText = name;
  message.innerText = text;
  newMessage.innerHTML = '<b>' + author.innerHTML + '</b>: ' + message.innerHTML;
  container.appendChild(newMessage);
  let seperator = document.createElement('br');
  container.appendChild(seperator);
  container.scrollTop = container.scrollHeight;
}
