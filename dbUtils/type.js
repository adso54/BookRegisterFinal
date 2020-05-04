
const { db } = require('./config');

const addType  =  (params)  =>{
    return new Promise((resolve, reject) =>{
        const {Description, Type} = params;
        db('type').insert({
            type: Type,
            description: Description
        })
        .returning('*')
        .then(createdType => {
            return resolve(createdType[0])
        })
        .catch(err => {return reject(err)})
    })
}

module.exports = {
    dbType: {
        addType: addType}
}