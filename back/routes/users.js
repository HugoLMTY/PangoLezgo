const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.get('/isAuth', (req, res) => {
    const _uid = req.cookies['uid']
    if (_uid != undefined) 
        res.send(true)
    else
        res.send(false)
})

router.get('/currentUser', async (req, res) => {
    const _uid = req.cookies['uid']

    user.find({_id: _uid }).then(
        (userInfos) => res.send(userInfos)
    )
})

router.get('/all', (req, res) => {
    const _uid = req.cookies['uid']
        user.find({_id: { $ne: _uid }}).then(
            (userList) => {
                res.send(userList)
        })
})


router.post('/login', async (req, res) => {
    let loginOptions = { uname: new RegExp(req.body.uname, 'i') }
    let no = {}
    const loginList = await user.findOne(loginOptions)

    const {id, name, uname, pwd} = loginList

    if (!loginList) {
        res.send(no)
    } else {
        if (req.body.pwd != pwd)
            res.send(no)
        else{
            res.cookie(
                'uid', id, 
                { 
                    expires: new Date(2099, 0,1), 
                    domain: 'localhost:4200'
                }).cookie(
                'uname', uname, 
                { 
                    expires: new Date(2099, 0,1), 
                    domain: 'localhost:4200'
                }).cookie(
                'name',  name, 
                { 
                    expires: new Date(2099, 0,1), 
                    domain: 'localhost:4200'
                }).send(
                loginList
            )
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


