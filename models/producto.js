const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  producto: {
    type: String,
    required: true,
    unique: true, // Campo único
  },
  descripcion: String,
  ubicacionStock: String,
  stock: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Producto', productoSchema);
