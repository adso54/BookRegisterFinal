const { db } = require('./config');

const addAuthor = (params) => {
    return new Promise((resolve, reject) => {

        const { CreateDate = new Date, CreateUser, FirstName, LastName, Description} = params;
    
        db('author').insert({
            create_date: CreateDate,
            create_user: CreateUser,
            first_name: FirstName,
            last_name: LastName,
            description: Description
        })
        .returning('*')
        .then(createdAuthor => {
            return resolve(createdAuthor);
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    dbAuthor: {
        addAuthor: addAuthor}
}