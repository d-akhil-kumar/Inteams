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
const groupsActiveUsers = require('./services/updateActiveUsers')


const app = express()
//const server = http.createServer(app)


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

const server = app.listen(PORT, async () => {
    console.log(`Server is running on port: ${PORT}`)
})

const io = require('./services/socket').initSocketIO(server)

io.on('connection', socket => {
    console.log('client connection')

    socket.on('joinGroup', ({ email, project, group }) => {
        const activeUsers = groupsActiveUsers.makeUserActive({ email, project, group }, socket.id)
        socket.emit(`${project}/${group}`, {
            action: 'active_users',
            data: activeUsers
        })
    })

    socket.on('disconnect', () => {
        const { actUsers, grpName } = groupsActiveUsers.makeUserInactive(socket.id)
        socket.emit(grpName, {
            action: 'active_users',
            data: actUsers
        })
    })
})