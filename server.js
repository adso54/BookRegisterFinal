const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send("it's working!");
})

process.env.PORT = 8080;

app.listen(process.env.PORT || 8080, () =>{
    console.log(`Listen on port: ${(process.env.PORT) ? process.env.PORT : '8080'} `);
})