'use strict'

require('dotenv').config()
const express = require('express')
const http = require('http')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user')
const projectRoute = require('./routes/project')
const msgRoute = require('./routes/message')
const ratingRoute = require('./routes/rating')
const logInOut = require('./controllers/login_out')
const auth = require('./middlewares/auth')
const setEnvironment = require('./set_env/add_data_to_db')
const errorMiddleware = require('./middlewares/error')
const requestLoggerMiddleware = require('./middlewares/request_logger')
const helmet = require('helmet')


const app = express()
const server = http.createServer(app)


app.use(helmet())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({
    extended: true,
}))

//to log every user request
app.use(requestLoggerMiddleware)

//run this API to add dummy data for testing
app.get('/setup', setEnvironment)

app.post('/login', logInOut.login)
    .get('/logout', logInOut.logout)


app.use(auth)
    .use('/users', userRoute)
    .use('/rate', ratingRoute)
    .use('/projects', projectRoute)
    .use('/messages', msgRoute)
    .use(errorMiddleware)
    .use('*', (req, res, next) => {
        res.status(404).json(
            {
                status: "failure",
                msg: "Api not found"
            }
        )
    })


const PORT = process.env.PORT || 8080

server.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`)
})