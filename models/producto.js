const mongoose = require('mongoose');

const productoModel = new mongoose.Schema({
    producto: { type: String, required: true },       // Campo requerido
    descripcion: { type: String },
    ubicacionStock: { type: String },
    stock: { type: Number, required: true, min: 0 },  // Campo requerido y con valor mínimo de 0
}, 
{
    timestamps: true,
    versionKey: false
});

const Modelproducto = mongoose.model('Producto', productoModel);

module.exports = Modelproducto;
