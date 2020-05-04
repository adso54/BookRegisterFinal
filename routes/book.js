const express = require('express');
const router = express.Router({mergeParams: true});
const { dbType} = require('../dbUtils/type');
const { dbBook}= require('../dbUtils/book');

router.post('/add', (req, res) => {
    const { CreateDate, CreateUser, Title, Description, Types, Authors, Image} = req.body;
    const TypeIds = [];

    if(Types.lenght>0){
        
    }


})