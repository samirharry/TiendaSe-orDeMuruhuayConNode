const express = require('express');

let app = express();
let Categoria = require('../models/categoria');

//=========================
// Obtener todas las categorias
//=============================
app.get('/categorias',(req,res)=>{
    Categoria.find({disponible: true})
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
            });
        }
        if(!categoriaDB) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

//=========================
// Actualizar Nombre de la Categoria
//=============================
app.put('/categorias/:id',(req,res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    Categoria.findById(id)
        .exec((err,categoriaDB)=>{
            if(err){
                return res.json({
                    ok: false,
                    err
                });
            }
            categoriaDB.nombre = nombre|| categoriaDB.nombre;
            categoriaDB.descripcion = descripcion|| categoriaDB.descripcion;
            categoriaDB.save((error,categoriaDB)=>{
                if(error){
                    return res.status(500).json({
                        ok: false,
                        msg: 'La categoria ya existe',
                        error
                    });
                }
                if(!categoriaDB) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'La categoria ya existe',
                        error
                    });
                }
                return res.json({
                    ok: true,
                    categoria: categoriaDB
                });
            });
        });
});
//=========================
// Eliminar categorias
//=============================
app.delete('/categorias/:id',(req,res)=>{
    let nombre = req.params.id;
    Categoria.findOneAndRemove({_id: nombre},{new: true},(err,categoriaDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            });
        }
        else if(! categoriaDB){
            res.status(400).json({
                ok: false,
                err:{
                    message: 'La categoria seleccionada no existe'
                }
            })
        }
        else{
            res.json({
                ok: true,
                message: 'La categoria ha sido borrada'
            });
        }
    });
});

module.exports = app;