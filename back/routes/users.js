const express = require('express')
const router = express.Router()
const user = require('../models/user')
const friend = require('../models/friends')
const bcrypt = require('bcrypt')
const friendRouter = require('./friends')

var isAuth = Boolean
var _uid =  String

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


router.get('/isAuth', (req, res) => {
    // const _uid = req.cookies['uid']
    if (isAuth == true) 
        res.send(true)
    else
        res.send(false)
})

router.get('/currentUser', async (req, res) => {
    // const _uid = req.cookies['uid']
    try {
        await user.find({_id: _uid }).then(
            (userInfos) => {
                res.send(userInfos)
            } 
        )
    } catch {
        res.send({})
    }
    
})

router.get('/countRequests', (req, res) => {
    try {
        friend.find({ user2: _uid, state: 'sent'}).then(
            (result) => res.send(result)
        )
    } catch {
        res.send({})
    }
})


router.post('/login', async (req, res) => {
    let loginOptions = { uname: new RegExp(req.body.uname, 'i') } 
    const loginList = await user.findOne(loginOptions)

    try {
        if (!loginList) {
            res.send({})
        } else {
            if (req.body.pwd != loginList.pwd){
                res.send({})
            } else {
                _uid = loginList._id
                isAuth = true
                res.send(loginList)
                // res.cookie(
                //     'uid', id, 
                //     { 
                //         expires: new Date(2099, 0,1)
                //     }).cookie(
                //     'uname', uname, 
                //     { 
                //         expires: new Date(2099, 0,1)
                //     }).cookie(
                //     'name',  name, 
                //     { 
                //         expires: new Date(2099, 0,1)
                //     }).send(
                //     loginList
                // )
            }
        }
    } catch {
        res.send({})
    }
})

router.post('/createAccount', async (req, res) => {
    const r = req.body
    if (!r.uname || !r.pwd || !r.name || !r.age ||  !r.family || !r.race || !r.feeding)
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
    // const _uid = req.cookies['uid']
    user.find({ _id: _uid }).then(
        (infos) => {
            res.send(infos)
        })
})

router.patch('/editAccount', (req, res) => {
    // const _uid = req.cookies['uid']
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
        res.send('infos mises à jour')
    )
})

router.delete('/deleteAccount', (req, res) => {
    // const _uid = req.cookies['uid']
    if (!_uid) 
        res.send('renseignez tous les champs')
    else {
        const toDelete = user.findById(_uid)

        if (toDelete == [])
            res.send('ID erroné')    
        else {
            user.findOneAndDelete(toDelete._id).then(
                res.send('suppr')
            )
        }
    }
})

router.get('/logout', (req, res) => {
    isAuth = false
    _uid = new String("")
    res.send('ok')
    // res.clearCookie('uid')
    // res.clearCookie('name')
    // res.clearCookie('uname')
})





router.get('/all', async (req, res) => {
    // const _uid = req.cookies['uid']
    const acceptedList = await friend.find({
        user1: _uid,
        state: 'accepted'
    })
    const _acceptedList = await friend.find({
        user2: _uid,
        state: 'accepted'
    })
    const sentList = await friend.find({ 
        user1: _uid,
        state: 'sent'
    })
    const receivedList = await friend.find({ 
        user2: _uid,
        state: 'sent'
    })

    let userIDList = []
    sentList.forEach(element => {
        userIDList.push(element.user2)
    })
    receivedList.forEach(element => {
        userIDList.push(element.user1)
    })
    acceptedList.forEach(element => {
        userIDList.push(element.user1)
    })
    _acceptedList.forEach(element => {
        userIDList.push(element.user1)
    })
    

    user.find({ _id: {
        $nin: userIDList,
        $ne: _uid
    }}).then(
        (userList) => {
            res.send(userList)
    })
})

router.get('/receivedList', async (req, res) => {
    let userListID = []

    const receivedList = await friend.find({
        user2: _uid,
        state: 'sent'
    })

    receivedList.forEach(element => {
        userListID.push(element.user1)
    })

    user.find({
        _id: {
            $in: userListID
        }
    }).then(
        (result) => res.send(result)
    )
})

router.get('/sentList', async (req, res) => {
    let userListID = []

    const sentList = await friend.find({
        user1: _uid,
        state: 'sent'
    })

    sentList.forEach(element => {
        userListID.push(element.user2)
    })

    user.find({
        _id: {
            $in: userListID
        }
    }).then(
        (result) => res.send(result)
    )
})

router.get('/acceptedList', async (req, res) => {
    let userListID = []
    
    const acceptedList = await friend.find({
        user1: _uid,
        state: 'accepted'
    })
    const _acceptedList = await friend.find({
        user2: _uid,
        state: 'accepted'
    })

    acceptedList.forEach(element => {
        userListID.push(element.user2)
    })
    _acceptedList.forEach(element => {
        userListID.push(element.user1)
    })

    user.find({
        _id: {
            $in: userListID
        }
    }).then(
        (result) => { res.send(result) } 
    )
})


// router.get('/acceptedList', async (req, res) => {
//     // const _uid = req.cookies['uid']

//     try {
//         const friendsAcceptedById = await friends.find({ user1: _uid, state: 'accepted' })
//         const _friendsAcceptedById = await friends.find({ user2: _uid, state: 'accepted' })
//     } catch {
//         console.log('err')
//     }
    
//     console.log(_uid)
//     console.log(friendsAcceptedById)
//     console.log(_friendsAcceptedById)

//     let idAcceptedList = []
//     friendsAcceptedById.forEach(element => {
//         idAcceptedList.push(element.user2)
//     });
//     _friendsAcceptedById.forEach(element => {
//         idAcceptedList.push(element.user1)
//     });
//     const userAcceptedList = await user.find({ _id: { $in: idAcceptedList } })
    
//     try {
//         if (userAcceptedList.length < 1) 
//             res.send({})
//         else
//             res.send(userAcceptedList)
//     } catch {
//         res.send({})
//     }
// })


module.exports = router


