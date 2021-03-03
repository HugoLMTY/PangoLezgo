const express = require('express')
const router = express.Router()
const user = require('../models/user')
const friends = require('../models/friends')
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
        friends.find({ user2: _uid, state: 'sent'}).then(
            (result) => res.send(result)
        )
    } catch {
        res.send({})
    }
})


router.post('/login', async (req, res) => {
    let loginOptions = { uname: new RegExp(req.body.uname, 'i') } 
    const loginList = await user.findOne(loginOptions)

    const resLogin = {
        wrongUname: false,
        wrongPwd: false
    }

    try {

        const hashCompare = await bcrypt.compare(req.body.pwd, loginList.pwd)
        if (!loginList) {
            res.send(resLogin({wrongUname: true}))
        } else {
            if (!hashCompare){
                res.send(resLogin({wrongPwd: true}))
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

    const hash = await bcrypt.hash(r.pwd, 10) 
    const userList = await user.find({uname: r.uname})

    if (userList != '')
        res.send('Pseudo déjà utilisé')
    else {
        new user({
            uname: r.uname,
            pwd: hash,
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
})

router.get('/profil', (req, res) => {
    // const _uid = req.cookies['uid']
    user.find({ _id: _uid }).then(
        (infos) => {
            res.send(infos)
        })
})

router.post('/editAccount', (req, res) => {
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
    const toDelete = user.findById(_uid)

    if (toDelete == [])
        res.send('ID erroné')    
    else {
        user.findOneAndDelete(toDelete._id).then(
            res.send('suppr')
        )
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




// ------------------------------------------  NOTES  --------------------------------------------
// Je n'ai pas réussi à faire fonctionner les cookies côté serveur, malgré le fonctionnement sur postman rien ne passe sur angular
// J'ai du improviser et j'ai donc créé une variable 'uid' (user id) définie lors du login et vidée lors du logout
// Le problème avec cette méthode était de transferer cette variable entre les routeur (apparement impossible)
// J'ai fini par me concentrer sur d'autres soucis et continuer d'avancer, c'est pourquoi les actions du friendServices se trouvent ici


router.get('/all', async (req, res) => {
    // const _uid = req.cookies['uid']
    const acceptedList = await friends.find({
        user1: _uid,
        state: 'accepted'
    })
    const _acceptedList = await friends.find({
        user2: _uid,
        state: 'accepted'
    })
    const sentList = await friends.find({ 
        user1: _uid,
        state: 'sent'
    })
    const receivedList = await friends.find({ 
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

    const receivedList = await friends.find({
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

    const sentList = await friends.find({
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
    
    const acceptedList = await friends.find({
        user1: _uid,
        state: 'accepted'
    })
    const _acceptedList = await friends.find({
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


router.post('/sendInvite', (req, res) => {
    // const _uid = req.cookies['uid']
    const targetID = req.body.targetID

    const newRequest = new friends({
        user1: _uid,
        user2: targetID,
        state: 'sent'
    })
    newRequest.save().then(
        res.send('sent')
    )
})

router.post('/acceptInvite', async (req, res) => {
    // const _uid = req.cookies['uid']
    const received = req.body.targetID

    try  {
        friends.findOneAndUpdate({

            $or: [
                {
                    $and: [ {user2: _uid}, {user1: received} ]
                }, 
                {
                    $and: [ {user1: _uid}, {user2: received} ]
                }
            ]}, {'state': 'accepted'})
            .then(
                res.send('ok')
            )
    } catch(e) {
        console.log('err: ',e)
    }
})

router.post('/rejectInvite', async (req, res) => {
    // const _uid = req.cookies['uid']
    const received = req.body.targetID

    friends.findOneAndDelete({
        $and: [
            {user2: _uid},
            {user1: received}
        ]}).then(
            res.send('ok')
        )
})

router.post('/cancelInvite', (req, res) => {
    // const _uid = req.cookies['uid']
    const targetID = req.body.targetID

    friends.findOneAndDelete({
        user1: _uid,
        user2: targetID,
        state: 'sent'
    }).then(
        res.send('ok')
    )
})

router.post('/deleteFriend', (req, res) => {
    // const _uid = req.cookies['uid']
    const targetID = req.body.targetID

    friends.findOneAndDelete({
        $or: [
            {
                user1: _uid,
                user2: targetID
            }, 
            {
                user1: targetID,
                user2: _uid
            }
        ]
    }).then(
        res.send('ok')
    )
})



// router.post('/answerInvite', async (req, res) => {
//     // const _uid = req.cookies['uid']
//     const action = req.body.userAction
//     const received = req.body.receivedID

//     if (action == false) {
//         friends.findOneAndDelete({
//             $and: [
//                 {user2: _uid},
//                 {user1: received}
//             ]}).then(
//                 res.send('deleted')
//             )
//     } else {
//         friends.findOneAndUpdate({
//             $and: [
//                 {user2: _uid},
//                 {user1: received}
//             ]}, { state: 'accepted' }).then(
//                 (result) => {
//                     res.send(result)
//                 }
//             )
//         }
// })

module.exports = router