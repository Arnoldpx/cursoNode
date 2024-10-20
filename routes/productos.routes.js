import { Router } from 'express';
import Producto from '../models/producto.model.js';


const router = Router();

router.post('/productos', async (req, res) => {
    try {
      const nuevoProducto = new Producto(req.body);
      const resultado = await nuevoProducto.save();
      res.status(201).json(resultado);
    } catch (error) {
      res.status(400).json({ error: error.mensaje });
    }
  });
  
  // Actualizar el stock 
  router.put('/productos/actualizar-stock', async (req, res) => {
    try {
      const { productos } = req.body; 

      if (!productos || productos.length === 0) {
        return res.status(400).json({ mensaje: 'No se enviaron productos para actualizar' });
      }
      for (const producto of productos) {
        const { id, cantidad } = producto;
        await Producto.findByIdAndUpdate(id, { cantidad }, { new: true });
      }
  
      res.status(200).json({ mensaje: 'Stock actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error actualizando el stock', error: error.message });
    }
  });
  
  // Obtener productos por categoría
  router.get('/productos/categoria/:categoria', async (req, res) => {
    try {
        const categoria = req.params.categoria;
        const productosPorCategoria = await Producto.find({ categoria: categoria });
        if (productosPorCategoria.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron productos en esta categoría' });
        }
        res.status(200).json({ data: productosPorCategoria });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener productos por categoría' });
    }
});

// Obtener producto con stock bajo
  router.get('/productos/bajo-stock/:cantidad', async (req, res) => {
    try {
        const cantidadLimite = parseInt(req.params.cantidad); 
        if (isNaN(cantidadLimite)) {
            return res.status(400).json({ mensaje: 'La cantidad límite debe ser un número' });
        }
        const productosBajoStock = await Producto.find({ cantidad: { $lt: cantidadLimite } });
        if (productosBajoStock.length === 0) {
            return res.status(404).json({ mensaje: 'No hay productos con bajo stock' });
        }
        res.status(200).json({ data: productosBajoStock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener productos con bajo stock' });
    }
});
  
  export default router;