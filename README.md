Trabajo de clase de Node
- **Opción 2: Inventario de stock**
    - Modelo de producto (idea)
        
        ```jsx
        const mongoose = require('mongoose');
        const Schema = mongoose.Schema;
        
        const productoSchema = new Schema({
          nombre: { type: String, required: true },
          descripcion: { type: String },
          precio: { type: Number, required: true },
          cantidad: { type: Number, required: true },
          categoria: { type: String },
          fechaIngreso: { type: Date, default: Date.now }
        });
        
        module.exports = mongoose.model('Producto', productoSchema);
        ```
        
    - Endpoints de negocio
        1. **Actualizar el stock de varios productos** (`PUT /productos/actualizar-stock`)
            - Este endpoint recibe una lista de productos con sus cantidades actualizadas y actualiza el stock de todos esos productos en la base de datos. Es útil para hacer ajustes de inventario masivos.
            
            **Flujo**:
            
            - El cliente envía un array de productos (con `id` y `cantidad` actualizada).
            - El servidor busca y actualiza cada producto en la base de datos con la nueva cantidad.
        
        ---
        
        1. **Obtener productos por categoría** (`GET /productos/categoria/:categoria`)
            - Este endpoint devuelve todos los productos que pertenecen a una categoría específica. Es útil para filtrar productos por tipo, como "Electrónica", "Ropa", etc.
            
            **Flujo**:
            
            - El cliente solicita productos pertenecientes a una categoría específica.
            - El servidor devuelve todos los productos que coinciden con esa categoría.
        
        ---
        
        1. **Obtener productos con bajo stock** (`GET /productos/bajo-stock/:cantidad`)
            - **Descripción**: Este endpoint devuelve todos los productos cuyo stock es menor a una cantidad especificada. Es útil para detectar productos que están a punto de agotarse.
            
            **Flujo**:
            
            - El cliente solicita productos cuyo stock sea inferior a un valor determinado.
            - El servidor devuelve todos los productos cuyo stock es menor a esa cantidad.
