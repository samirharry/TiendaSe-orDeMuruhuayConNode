const mongoose = require('mongoose');

let Schema = mongoose.Schema;
let productoSchema = Schema({
    nombre:{
        type: String,
        require: [true,"El nombre es necesario"]
    },
    precio:{
        type: Number,
        require: [true,"El precio es requerido"]
    },
    descripcion:{
        type: String
    },
    cantidad:{
        type: String,
        require: [true,"La cantidad es requerida"]
    },
    marca:{
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        require: [true,"La marca es requerida"]
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: [true,"La categoria es requerida"]
    }
});

module.exports = mongoose.model('Producto',productoSchema);