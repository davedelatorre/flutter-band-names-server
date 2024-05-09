const {io} = require('../index')
//Sockets Messages
io.on('connection', client => {

    console.log('Client Connected')

    client.on('disconnect', () => { 
        console.log('Client Disconnected') 
    });

    client.on('Message',(payload)=>{
        console.log('Message!!', payload)
        io.emit('Message',{admin:'New Message on Server'})
    })

    client.on('cast-message',(payload)=>{
        //io.emit('new-message', payload) //All
        console.log('Message!!', payload)
        client.broadcast.emit('new-message', payload) //All but itself
    })

});