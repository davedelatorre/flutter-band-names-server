const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands()
bands.addBand(new Band('Queen'))
bands.addBand(new Band('Bon Jovi'))
bands.addBand(new Band('Metallica'))
bands.addBand(new Band('Megadeth'))

console.log(bands)
//Sockets Messages
io.on('connection', client => {

    console.log('Client Connected')

    client.emit('active-bands', bands.getBands())


    client.on('disconnect', () => { 
        console.log('Client Disconnected') 
    });

    client.on('Message',(payload)=>{
        console.log('Message!!', payload)
        io.emit('Message',{admin:'New Message on Server'})
    })

    // client.on('cast-message',(payload)=>{
    //     //io.emit('new-message', payload) //All
    //     console.log('Message!!', payload)
    //     client.broadcast.emit('new-message', payload) //All but itself
    // })

    client.on('vote-band',(payload) =>{
        //console.log(payload)
        bands.voteBand(payload.id)
        io.emit('active-bands', bands.getBands())
    })

    client.on('add-band',(payload)=>{
        const band = new Band(payload.name)
        bands.addBand(band)
        io.emit('active-bands', bands.getBands())
    })

    client.on('delete-band',(payload)=>{
        bands.deleteBand(payload.id)
        io.emit('active-bands', bands.getBands())
    })

});