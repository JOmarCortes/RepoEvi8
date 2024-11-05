// producto.test.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Modelproducto = require('./models/producto');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Modelproducto.deleteMany(); // Limpia los datos después de cada prueba
});

describe('Modelo Producto', () => {
  test('debería crear un producto válido', async () => {
    const productoData = {
      producto: 'Teclado',
      descripcion: 'Teclado mecánico',
      ubicacionStock: 'Estante 1',
      stock: 10,
    };

    const producto = new Modelproducto(productoData);
    const savedProducto = await producto.save();

    // Verificaciones
    expect(savedProducto._id).toBeDefined();
    expect(savedProducto.producto).toBe(productoData.producto);
    expect(savedProducto.descripcion).toBe(productoData.descripcion);
    expect(savedProducto.ubicacionStock).toBe(productoData.ubicacionStock);
    expect(savedProducto.stock).toBe(productoData.stock);
  });

  test('debería fallar al crear un producto sin campos requeridos', async () => {
    const productoData = {
      descripcion: 'Producto sin nombre',
      stock: -5, // Stock inválido
    };

    const producto = new Modelproducto(productoData);
    let error;
    try {
      await producto.save();
    } catch (e) {
      error = e;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError');
  });
});


