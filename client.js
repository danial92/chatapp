// Connecting with port
const socket = io('http://localhost:3000');

// DOM Elements
let form = document.querySelector('.form');
let inputMessage = document.getElementById('inputMessage');
let messageContainer = document.querySelector('.container');

// Prompt for Entering Name
let name = prompt('Enter Your Name!');

// Audio file for Message tune
let ring = new Audio('../assets/https___www.tones7.com_media_text_notification.mp3');

// Append function
const appending = (message, person) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(person);
    messageContainer.append(messageElement);
}

// New User Joins
socket.emit('joined', name)

socket.on('has-joined', name => {
  appending(`${name} has joined the chat`, 'other')
})

// Sending Text
form.addEventListener('submit', e => {
    e.preventDefault();
    const message = inputMessage.value
    appending(`You: ${message}`, 'me')
    socket.emit('send', message)
    inputMessage.value = '';
})

// Receiving Text
socket.on('receive', data => {
    appending(`${data.name}: ${data.message}`, 'other')
    ring.play()
})

// User Left
socket.emit('disconnect', name)

socket.on('disconnected', name => {
    appending(`${name} has left the chat!`, 'other')
})


