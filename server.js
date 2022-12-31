const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
// const { logger, logEvents } = require('./middleware/logger')
require("dotenv").config({ path: "./config/.env" })

mongoose.set('strictQuery', false) //suppress deprecation msg

// console.log( process.env.NODE_ENV )
connectDB()

const PORT = process.env.PORT || 3500
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '.', 'public')))
app.use('/', require('./routes/root'))
app.use('/areas', require('./routes/areaRoutes'))

// app.all('*', (req, res, next) => {
//     res.status(404) //default status
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     } else if (req.accepts('json')) {
//         res.json( {message: '404 - route not found'})
//     } else {
//         res.type('txt').send('404 Not found')
//     }
// })

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    `mongoErrLog.log`)
})

