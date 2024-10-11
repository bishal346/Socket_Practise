const express = require("express"); 
const app = express(); 
const socketio = require("socket.io"); 
const nameSpaces = require("./NameSpaces");

app.use(express.static(__dirname + '/public')); 

const expressServer = app.listen(8001); 
const io = socketio(expressServer); 

app.get('/ngetAPI' , (req,res) => {
    io.of(nameSpaces[0].endpoint).emit('apichange',nameSpaces[0])
    res.json(nameSpaces[0]); 
})

io.of('/').on('connection', (socket) => {
    console.log(socket.id,"has connected")
    io.emit('nameSpaces', nameSpaces); 
    socket.on('messageFromHomeAdmin',(data) => {
        //console.log(data); 
    })
    io.of('/admin').emit('fromHome', {adminData:'Hello its Admin fromHome'})
    // io.of('/admin').emit('onAdmin', {adminData:'Hello from Admin'}); 
    // socket.emit('messageFromServer', {message : 'Hello Server buddy'})
    // socket.on('messageFromClient',(data) => {
    //     //console.log(data); 
    // })
    // socket.on('messageFromUser',(data) => {
    //     //console.log(data.text)
    //     io.emit('backFromServer', {text : data.text})
    // })
    // socket.on('adminClient', (data) => {
    //     //console.log('Admin Client Data'); 
    //     //console.log(data); 
    // })
})

io.of('/admin').on('connection', (socket) => {
    console.log(socket.id,"has connected for Admin")
    io.of('/admin').emit('onAdmin', {adminData:'Hello from Admin'})
    // io.of('/admin').emit('fromHome', {adminData:'Hello its Admin fromHome'})
    socket.join('room_1'); 
    io.of('/admin').to('room_1').emit('adminRoom', {data : 'from admin room'}); 
    socket.on('adminClient', (data) => {
        //console.log('Admin Client Data'); 
        //console.log(data); 
    }) 
    
    socket.on('messageFromAdminHome',(data) => {
        //console.log(data); 
    })
})
nameSpaces.forEach(obj => {
    // console.log(obj.endpoint)
    io.of(obj.endpoint).on('connection', (socket) => {
        console.log(`${obj.endpoint} ${socket.id} has connected`)
        const roomArray = socket.rooms
        socket.on('roomTriggered_joinRoom',async (data, ack) => {
            // console.log(socket.rooms); 
            let i = 0; 
            roomArray.forEach(rooms => {
                if(i>0) {
                    socket.leave(rooms); 
                }
                i++; 
            })
            console.log(data); 
            socket.join(data.title); 
            const currArray = data.title.split(' '); 
            const thisRoom = obj.rooms.find(obj1 => obj1.title === currArray[1]); 
            // console.log(data.title)
            // console.log(currArray[1]); 
            // console.log(obj.rooms); 
            console.log(thisRoom); 
            io.of(obj.endpoint).in(data.title).emit('sentMessageHistory', thisRoom.message); 
            const sockets = await io.of(obj.endpoint).in(data.title).fetchSockets(); 
            // console.log(sockets); 
            const socketCount = sockets.length; 
            console.log('socketCount -> '+socketCount); 
            ack({status : 'Ok', title : data.title, numUsers : socketCount}); 
        })
        socket.on('messageFromUser',data => {
            console.log(data); 
            const currentRoom = [...roomArray][1]
            io.of(obj.endpoint).in(currentRoom).emit('backFromServer', data)
            const currArray = currentRoom.split(' '); 
            // console.log(currArray); 
            const thisRoom = obj.rooms.find(obj1 => obj1.title === currArray[1]); 
            thisRoom.addMessage(data); 
            // console.log(thisRoom); 
        })
    })
})