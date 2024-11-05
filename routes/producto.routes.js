const express = require ('express');
const router = express.Router();
const productoCtrl = require ('../controllers/producto.controller')

router.get('/', productoCtrl.getProducto);
router.post('/', productoCtrl.createProducto);
router.get('/:id', productoCtrl.getUniqueProducto);
router.put('/:id', productoCtrl.editProducto);
router.delete('/:id', productoCtrl.deleteProducto);

module.exports = router;