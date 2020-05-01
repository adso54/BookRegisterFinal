const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const { error } = require('./errorCode')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Test123',
      database : 'BookRegister'
    }
  });


const app = express();
app.use(bodyParser.json());


app.get('/', (req,res) => {
    db.select('*').from('User')
    .then(user => {res.json(user)})
    ;
})

app.post('/register', (req, res) => {
    const { name, email, createDate = new Date(), password} = req.body;
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
                .then(() => res.json(userId))
                .catch(err => console.log(err))
                
        })
        
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => {
            res.json(err)
    });

})

app.post('/signIn', (req,res) => {
    const {password, email} = req.body;
    db.select('user.email', 'login.password')
        .from('user')
        .innerJoin('login','user.id','login.user_id')
        .then(data => {
            res.send(data)
        })   
        .catch(err =>  res.send(err)); 
})


process.env.PORT = 8080;

app.listen(process.env.PORT || 8080, () =>{
    console.log(`Listen on port: ${(process.env.PORT) ? process.env.PORT : '8080'} `);
})