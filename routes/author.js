const express = require('express');
const router = express.Router({mergeParams: true});
const {dbAuthor} = require('../dbUtils/author.js')

router.post('/add', (req, res) => {
    dbAuthor.addAuthor(req.body)
    .then(response => {return res.json(response)})
    .catch(err=> {return res.json(err)})
})

module.exports = router;