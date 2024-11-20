const ModelProducto = require('../models/producto');

const productoCtrl = {};

// Crear Producto
productoCtrl.createProducto = async (req, res) => {
  try {
    console.log('Datos recibidos:', req.body); // Agrega este registro
    const { producto } = req.body;

    // Verificar si el producto ya existe en la base de datos
    const productoExistente = await ModelProducto.findOne({ producto });
    if (productoExistente) {
      return res.status(400).json({ message: 'El producto ya existe.' });
    }

    // Crear el nuevo producto
    const { _id, ...body } = req.body; // Eliminar cualquier campo `_id` que pueda venir
    const nuevoProducto = await ModelProducto.create(body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ message: 'Error al crear el producto', error });
  }
};


// Consultar Productos
productoCtrl.getProducto = async (req, res) => {
  const respuesta = await ModelProducto.find({});
  res.send(respuesta);
};

// Consultar Producto por ID
productoCtrl.getUniqueProducto = async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelProducto.findById({ _id: id });
  res.send(respuesta);
};

// Actualizar Producto
productoCtrl.editProducto = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  const respuesta = await ModelProducto.findByIdAndUpdate({ _id: id }, body);
  res.send(respuesta);
};

// Eliminar Producto
productoCtrl.deleteProducto = async (req, res) => {
  const id = req.params.id;
  const respuesta = await ModelProducto.deleteOne({ _id: id });
  res.send(respuesta);
};

module.exports = productoCtrl;
