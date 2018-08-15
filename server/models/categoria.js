const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let categoriaSchema = Schema({
    nombre:{
        type: String,
        unique:true,
        require: [true,'El nombre es requerido']
    },
    descripcion:{
        type: String,
        require: [true,'La descripcion es requerida']
    },
    disponible:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Categoria',categoriaSchema);