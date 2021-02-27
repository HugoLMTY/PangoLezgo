const express = require('express')
const router = express.Router()
const user = require('../models/user')
const friends = require('../models/friends')

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "localhost:4200");
    next();
 });

router.post('/sendInvite', (req, res) => {
    const _uid = req.cookies['uid']
    const targetID = req.body.targetID

    if (!targetID || !_uid)
        res.send('Merci de remplir les champs')

    const newRequest = new friends({
        user1: _uid,
        user2: targetID,
        state: 'sent'
    })
    newRequest.save().then(
        res.send('sent')
    )
})

router.post('/answerInvite', async (req, res) => {
    const _uid = req.cookies['uid']
    const action = req.body.userAction
    const received = req.body.receivedID

    if (action == false) {
        friends.findOneAndDelete({
            $and: [
                {user2: _uid},
                {user1: received}
            ]}).then(
                res.send('deleted')
            )
    } else {
        friends.findOneAndUpdate({
            $and: [
                {user2: _uid},
                {user1: received}
            ]}, { state: 'accepted' }).then(
                (result) => {
                    res.send(result)
                }
            )
        }
})

router.post('/acceptInvite', async (req, res) => {
    const _uid = req.cookies['uid']
    const action = req.body.userAction
    const received = req.body.receivedID

    friends.findOneAndUpdate({
        $and: [
            {user2: _uid},
            {user1: received}
        ]}, { state: 'accepted' }).then(
            (result) => {
                res.send(result)
        })
})

router.post('/rejectInvite', async (req, res) => {
    const _uid = req.cookies['uid']
    const action = req.body.userAction
    const received = req.body.receivedID

    friends.findOneAndDelete({
        $and: [
            {user2: _uid},
            {user1: received}
        ]}).then(
            res.send('deleted')
        )
})

router.post('/cancelInvite', (req, res) => {
    const _uid = req.cookies['uid']
    const targetID = req.body.targetID

    friends.findOneAndDelete({
        user1: _uid,
        user2: targetID
    }).then(
        res.send('canceled')
    )
})

router.post('/deleteFriend', (req, res) => {
    const _uid = req.cookies['uid']
    const targetID = req.body.targetID

    friends.findOne({
        $or: [
            {
                user1: _uid,
                user2: targetID
            }, 
            {
                user2: _uid,
                user1: targetID
            }
        ]
    }).then(
        (toDelete) => {
            res.send(toDelete)
        }
    )
})

router.get('/sentList', async (req, res) => {
    const _uid = req.cookies['uid']
    const friendsSentById = await friends.find({ user1: _uid, state: 'sent' })

    let idSentList = []
    friendsSentById.forEach(element => {
        idSentList.push(element.user2)
    })

    if (idSentList.length < 1) 
        res.send('aucune invitation envoyée')
    else {
        await user.find({ _id: { $in: idSentList } }).then(
            (userList) => {
                res.send(userList)
        })
    }
})

router.get('/receivedList', async (req, res) => {
    const _uid = req.cookies['uid']
    const friendsReceived = await friends.find({ user2: _uid, state: 'sent' })

    let idReceivedList = []
    friendsReceived.forEach(element => {
        idReceivedList.push(element.user1)
    })
    await user.find({ _id: { $in: idReceivedList } }).then(
        (list) => {
            res.send(list)
        })
})

router.get('/acceptedList', async (req, res) => {
    const _uid = req.cookies['uid']
    if (!_uid)
        res.send('merci de remplir les champs')
    
    const friendsAcceptedById = await friends.find({ user1: _uid, state: 'accepted' })
    const _friendsAcceptedById = await friends.find({ user2: _uid, state: 'accepted' })
    
    let idAcceptedList = []
    friendsAcceptedById.forEach(element => {
        idAcceptedList.push(element.user2)
    });
    _friendsAcceptedById.forEach(element => {
        idAcceptedList.push(element.user1)
    });

    const userAcceptedList = await user.find({ _id: { $in: idAcceptedList } })

    if (userAcceptedList.length < 1) 
        res.send('Aucun ami')
    else
        res.send(userAcceptedList)

    // const userList = await user.find({
    //     $and: [
    //         { _id: { $nin: idSentList }},
    //         { _id: { $nin: idAcceptedList }},
    //         { _id: { $nin: idReceivedList }},
    //         { _id: {$ne: _uid}} 
    //     ]
    // })

})

router.get('/all', async (req, res) => {
    const _uid = req.cookies['uid']
    const userList = []
    const newList = await user.find({}).then(
        (list) => {
            userList = list
        },
        res.send(userList)
    )
})

module.exports = router