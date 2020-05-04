const express = require('express');
const bodyParser = require('body-parser');

// Importing routers
const typeRoutes = require('./routes/type');
const authorRoutes = require('./routes/author');
const indexRoutes = require('./routes/index');

// App config
const app = express();
app.use(bodyParser.json());

// Routes Config:
app.use( '/type', typeRoutes);
app.use( '/author', authorRoutes);
app.use( '/', indexRoutes);


process.env.PORT = 8080;

app.listen(process.env.PORT || 8080, () =>{
    console.log(`Listen on port: ${(process.env.PORT) ? process.env.PORT : '8080'} `);
})