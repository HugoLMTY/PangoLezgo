const express = require('express')
const user = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt');
const { findByIdAndUpdate, findById } = require('../models/user');
const friendRouter = require('./friends_server')


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

router.get('/all', (req, res) => {
    const _uid = req.cookies['uid']
        user.find({_id: { $ne: _uid }}).then(
            (userList) => {
                res.send(userList)
        })
})


router.post('/login', async (req, res) => {
    console.log('back ok')
    if (!req.body.uname || !req.body.pwd)
        res.send('renseignez tous les champs')

    let loginOptions = {
        uname: new RegExp(req.body.uname, 'i')
    }
    const loginList = await user.findOne(loginOptions)

    if (!loginList) {
        console.log('no 1')
    } else {
        if (req.body.pwd != loginList.pwd)
            console.log('no 2')
        else{
            res.cookie('uid',   loginList._id,      { expires: new Date(2099, 0,1)})
            res.cookie('uname', loginList.uname,    { expires: new Date(2099, 0,1)})
            res.cookie('name',  loginList.name,     { expires: new Date(2099, 0,1)})
        }
    }
})

router.post('/createAccount', async (req, res) => {
    const r = req.body
    if (!r.uname || !r.pwd || !r.pwdConfirm || !r.name || !r.age ||  !r.family || !r.race || !r.feeding)
        res.send('remplissez tous les champs')

    const hash = await bcrypt.hash(r.pwd, 10) 
    const userList = await user.find({uname: r.uname})


    if (userList != '')
        res.send('Pseudo déjà utilisé')
    else {
        if (r.pwd !=  r.pwdConfirm)
            res.send('Mots de passe différents')
        else
           {
            new user({
                uname: r.uname,
                pwd: r.pwd,
                name: r.name,
                age: r.age,
                family: r.family,
                race: r.race,
                feeding:  r.feeding
            }).save().then( 
                (newUser) => {
                    res.send(newUser)
                })
        }
    }
})


router.get('/profil', (req, res) => {
    const _uid = req.cookies['uid']
    user.find({ _id: _uid }).then(
        (infos) => {
            res.send(infos)
        })
})

router.patch('/editAccount', (req, res) => {
    const _uid = req.cookies['uid']
    const r = req.body

    const toUpdate = user.findById(_uid)

    const datas = {
        name:       r.name,
        age:        r.age,
        family:     r.family,
        race:       r.race,
        feeding:    r.feeding
    }

    user.updateOne(toUpdate, datas).then(
        res.send('infos mise à jour')
    )
})

router.delete('/deleteAccount', (req, res) => {
    const _uid = req.cookies['uid']

    if (!_uid) 
        res.send('renseignez tous les champs')
    else {
        const toDelete = user.findById(_uid)

        if (toDelete == [])
            res.send('ID erroné')    
        else {
            user.findOneAndDelete(toDelete._id).then(
                console.log('ok'),
                res.send('suppr')
            )
        }
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('uid')
    res.clearCookie('name')
    res.clearCookie('uname')
    res.send('offline')
})




module.exports = router


