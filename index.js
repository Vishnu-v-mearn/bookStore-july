require('dotenv').config()
//this configure the .env file to the application, the data inside the .env file will be accessible throughout the application the proccess global object




require('./dbConfig')
const express = require('express')
const cors = require('cors')
const router = require('./routes')


const server = new express()

server.use(cors())

server.use(express.json())

server.use('/uploads',express.static('./uploads'))

server.use(router)


server.get('/getDetails', (req,res)=>{
    res.status(200).json({message:'Req Recived'})
})


// server.get('/showHTML', (req,res)=>{
//     res.status(200).send('<h1 style="color:red" >Hello World</h1> <P style="background-color:blue" >zjnsnadhejgfjb cgs gcvdcjscbh</P>')
// })


const port =3000

server.listen (port,()=>{
    console.log('server is listening to',port)
})