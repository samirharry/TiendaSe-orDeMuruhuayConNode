const express = require('express');

let app = express();
let Categoria = require('../models/categoria');

//=========================
// Obtener todas las categorias
//=============================
app.get('/categorias',(req,res)=>{
    Categoria.find({})
        .exec((err,categorias)=>{
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            });
        });
});



// =====================
// Crear una nueva Categoria
// =====================

app.post('/categorias',(req,res)=>{
    let body = req.body;
    let categoria = new Categoria({
        nombre: body.nombre,
        descripcion: body.descripcion
    });
    categoria.save((err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if(!categoriaDB) {
            return res.json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

module.exports = app;