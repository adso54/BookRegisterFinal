const express = require('express');
const router = express.Router({mergeParams: true});
// const { dbType} = require('../dbUtils/type');
const { dbBook}= require('../dbUtils/book');

router.post('/add', (req, res) => {
   dbBook.addBook(req.body)
   .then((book) =>res.json(book))
   .catch((err) =>res.json(err))
})

module.exports = router;