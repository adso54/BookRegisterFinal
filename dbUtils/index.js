const { db } = require('./config');
const bcrypt = require('bcrypt');

const register = (params) =>{
    return new Promise((resolve, reject) =>{
        const { name, email, createDate = new Date(), password} = params;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        db.transaction(trx => {
            trx
            .insert({
                name: name,
                email: email,
                create_date: createDate
            })
            .into('user')
            .returning('id')
            .then(userId => {
                return trx
                    .insert({
                        user_id: Number(userId),
                        password: hash
                    })
                    .into('login')
                    .returning('*')
                    .then(() => resolve(userId))
                    .catch(err => reject(err))                   
            }) 
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => {
            reject(err)
        });
    }) 
}

const signIn = (params) => {
    return new Promise((resolve, reject) => {
        const {password, email} = params;
        db.select('user.*',  'login.password')
            .from('user')
            .innerJoin('login','user.id','login.user_id')
            .where('user.email', '=', email)
            .then(data => {
                const dbPassword = data[0].password;
                if(dbPassword){
                    const isValid = bcrypt.compareSync(password, dbPassword)
                    if(isValid){
                        delete data[0].password
                        return resolve(data[0])
                    }
                }
                return reject({
                    error: "Wrong credentials!"
                })
                
            })   
            .catch(err =>  reject(err)); 
    })
    
}


module.exports = {
    dbIndex: {
        register: register,
        signIn: signIn  
    }
}