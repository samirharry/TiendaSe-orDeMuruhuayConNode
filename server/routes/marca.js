const express = require('express');

let app = express();
let Marca = require('../models/marca');

//=========================
// Obtener todas las marcas
//=============================
app.get('/marcas',(req,res)=>{
    Marca.find({disponible: true})
        .exec((err,marcas)=>{
            if(err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                marcas
            });
        });
});



// =====================
// Crear una nueva Marca
// =====================

app.post('/marcas',(req,res)=>{
    let body = req.body;
    let marca = new Marca({
        nombre: body.nombre,
        descripcion: body.descripcion
    });
    marca.save((err,marcaDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if(!marcaDB) {
            return res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            marca: marcaDB
        });
    });
});

//=========================
// Actualizar Nombre de la Marca
//=============================
app.put('/marcas/:id',(req,res)=>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    Marca.findById(id)
        .exec((err,marcaDB)=>{
            if(err){
                return res.json({
                    ok: false,
                    err
                });
            }
            marcaDB.nombre = nombre|| marcaDB.nombre;
            marcaDB.descripcion = descripcion|| marcaDB.descripcion;
            marcaDB.save((error,marcaDB)=>{
                if(error){
                    return res.status(500).json({
                        ok: false,
                        msg: 'La marca ya existe',
                        error
                    });
                }
                if(!categoriaDB) {
                    return res.status(400).json({
                        ok: false,
                        msg: 'La marca ya existe',
                        error
                    });
                }
                return res.json({
                    ok: true,
                    marca: marcaDB
                });
            });
        });
});
//=========================
// Eliminar marcas
//=============================
app.delete('/marcas',(req,res)=>{
    let nombre = req.body.nombre;
    let cambiaDisponibilidad = {
        disponible:false
    };
    Marca.findOneAndUpdate({nombre: nombre},cambiaDisponibilidad,{new: true},(err,marcaDB)=>{
        if(err){
            res.status(500).json({
                ok: false,
                err
            });
        }
        else if(! marcaDB){
            res.status(400).json({
                ok: false,
                err:{
                    message: 'La marca seleccionada no existe'
                }
            })
        }
        else{
            res.json({
                ok: true,
                message: 'La marca ha sido borrada'
            });
        }
    });
});

module.exports = app;