require('./config/config.js');
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use( express.static(path.resolve(__dirname,'../public')));

app.use(require('./routes/index'));




mongoose.connect(process.env.URLDB,{ useNewUrlParser: true },(err,res)=>{
    if(err) {
        console.log('No conectaste la base de datos');
    };
    console.log("Base de Datos online");
});

app.listen(process.env.PORT,()=>{
    console.log("Escuchando Puerto:", 3000);
});