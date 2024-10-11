const express = require("express"); 
const app = express(); 
const socketio = require("socket.io"); 

app.use(express.static(__dirname + '/public')); 

const expressServer = app.listen(8000); 
const io = socketio(expressServer); 

io.on('connection', (socket) => {
    console.log(socket.id,"has connected")
    socket.emit('messageFromServer', {message : 'Hello Server buddy'})
    socket.on('messageFromClient',(data) => {
        console.log(data); 
    })
    socket.on('messageFromUser',(data) => {
        console.log(data.text)
        io.emit('backFromServer', {text : data.text})
    })
})