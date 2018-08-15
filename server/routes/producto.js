const express = require('express');
let app = express();
let Producto = require('../models/producto');

//========================
//Insertar nuevos productos
//=========================
app.post('/productos',(req,res)=>{
    let body = req.body;

    let producto = Producto({
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
        
    });
});




module.exports = app;