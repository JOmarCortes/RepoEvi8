const ModelProducto = require ('../models/producto');

const productoCtrl = {};

//Crear
productoCtrl.createProducto = async (req, res) => {
  try {
    // Elimina cualquier campo `_id` que pueda venir en el cuerpo de la solicitud
    const { _id, ...body } = req.body;
    const respuesta = await ModelProducto.create(body);
    res.status(201).send(respuesta); // Usa un código de estado 201 para creación exitosa
  } catch (error) {
    console.error("Error al crear el producto:", error);
    res.status(400).json({ message: "Error al crear el producto", error });
  }
};
  
    

//Consultar
productoCtrl.getProducto = async (req, res)=>{
    const respuesta = await ModelProducto.find({})
    res.send(respuesta)
}

//Consultar por Id
productoCtrl.getUniqueProducto = async (req, res)=>{
    const id = req.params.id;
    const respuesta = await ModelProducto.findById({_id:id})
    res.send(respuesta)
}

//Actualizar
productoCtrl.editProducto = async (req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelProducto.findByIdAndUpdate({_id:id}, body);
    res.send(respuesta)
}

//Eliminar
productoCtrl.deleteProducto = async (req, res)=>{
    const id = req.params.id;
    const respuesta = await ModelProducto.deleteOne({_id:id})
    res.send(respuesta)
}

module.exports =productoCtrl;