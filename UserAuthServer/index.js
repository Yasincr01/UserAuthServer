require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./database/dbConnection')


const uaServer = express()

uaServer.use(cors())
uaServer.use(express.json())
uaServer.use(router)

const PORT = 3000 || process.env.PORT

uaServer.listen(PORT,()=>{
    console.log(`uaServer Started at port ${PORT} and waiting for client request!!!`)
})

// resolving get request to http://localhost:3000/
uaServer.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:red;">pfServer Started at port and waiting for client request!!!</h1>`)
}
)

