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

//=========================
// Actualizar Nombre de la Categoria
//=============================

//=========================
// Eliminar categorias
//=============================
app.delete('/categorias/:id',(req,res)=>{
    let id = req.params.id;
    let cambiaDisponibilidad = {
        disponible:false
    };
    Categoria.findByIdAndUpdate(id,cambiaDisponibilidad,{new: true},(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(! categoriaDB){
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'La categoria seleccionada no existe'
                }
            })
        }

        res.json({
            ok: true,
            message: 'La categoria ha sido borrada'
        });
    });
});

module.exports = app;