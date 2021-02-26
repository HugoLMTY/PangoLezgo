const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/users')
const friendsRouter = require('./routes/friends')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lezgo', { useNewUrlParser: true})
mongoose.set('useFindAndModify', false)

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('DB Connectée'))

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/user', userRouter)
app.use('/api/friend', friendsRouter)

app.listen(process.env.PORT || 3000)