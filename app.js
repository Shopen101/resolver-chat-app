const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const socketio = require('socket.io')
// const server = require('http').Server(app)

const http = require('http')
const cors = require('cors')
const server = http.createServer(app)

const io = socketio(server)

app.use(cors())
app.use(express.json({ extended: true }))

// подключение роутов обработки запросов
app.use('/auth', require('./routes/auth.routes'))
app.use('/messanger', require('./routes/messanger.routes'))
app.use('/addNewTxt', require('./routes/addText.routes'))
app.use('/getAccordion', require('./routes/getAccordion.routes'))
app.use('/getAccordion', require('./routes/getAccordion.routes'))
app.use('/getUserFindData', require('./routes/getUserFindData.routes'))
app.use('/messangerMove', require('./routes/messanger.dialogs.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000

// обработка сокет запроса нового сообщения
io.on('connection', socket => {
    socket.on('NEW_MESSAGE', ({ id, text, user, dialog, data_time, activeUser, myName }) => {
        const msg = {
            id,
            text,
            user,
            dialog,
            data_time,
            activeUser,
            myName
        }

        io.emit('NEW_MESSAGE', msg)
    })
    console.log(`запустился сокет, ${socket}`)
})

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        server.listen(PORT, () => console.log(`app has been started on port ${PORT}`))
    } catch (error) {
        console.log('Server error ', error.message)
        process.exit(1)
    }
}

start()
