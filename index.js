require('dotenv').config()
const express= require('express')
const cors=require('cors')

const router = require('./Routes/router')

const db= require('./DB/connection')
const ApplicationMiddleware = require('./Middleware/ApplicationMiddleware')
const jwtMiddleware = require('./Middleware/jwtMiddleware')

const pfServer=express()



pfServer.use(cors())
pfServer.use(express.json())
pfServer.use('/uploads',express.static('./uploads'))
pfServer.use(router)
// pfServer.use(ApplicationMiddleware)
pfServer.use(jwtMiddleware)



const PORT=3000|| process.env.PORT
pfServer.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

pfServer.get('/',(req,res)=>{
    res.send('hello from server')
})