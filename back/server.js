const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/users')
const friendsRouter = require('./routes/friends')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/lezgo', { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false)
//mongodb+srv://lmty:7wVwTvD2R84Kf5A@pango-db.1ppof.mongodb.net/lezgo

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('DB Connectée'))

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/user', userRouter)
app.use('/friend', friendsRouter)

app.listen(process.env.PORT || 3000)