const { db } = require('./config');



const addBook = (params) =>{
    return new Promise((resolve, reject) =>{
        const {createDate, createUser, title, description, image} = params;
        db('book')
        .insert({
            create_date: createDate,
            create_user: createUser,
            title: title,
            description: description,
            image: image
        })
        .returning('*')
        .then(createdBook => {resolve(createdBook)})
        .catch(err=>reject(err))
    })
}

module.exports = {dbBook:{
    addBook: addBook
}}