const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let marcaSchema = Schema({
    nombre:{
        type: String,
        require: [true,'El nombre es obligatorio']
    },
    descripcion:{
        type: String
    },
    disponible:{
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Marca',marcaSchema);