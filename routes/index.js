const express = require('express');
const router = express.Router({mergeParams: true});
const {dbIndex} = require('../dbUtils/index');

router.post('/register', (req, res) => {
    dbIndex.register(req.body)
    .then(createdUser => {res.json(createdUser)})
    .catch(err=>res.json(err))
})

router.post('/signIn', (req,res) => {
    dbIndex.signIn(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})





module.exports = router;