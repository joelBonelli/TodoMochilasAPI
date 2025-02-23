import * as productosModel from "../models/productosModel.js";
import db from '../db.js';


export async function getProductos(req, res) {
    try {
        const results = await productosModel.getProductos()
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json( { message: "Error al recuperar los datos"});
    }
}

export async function getProductosId( req, res) {
    const id = req.params.id

    try {
        const results = await productosModel.getProductosId(id)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json( { message: "Error al recuperar el dato del producto"})
    }
}


export async function updateProductosId( req, res) {
    const id = req.params.id
    const { nombre, precio, descripcion, imagenActual } = req.body;

    console.log("Body recibido:", req.body);
    console.log("Archivo recibido:", req.file);


    // Verifica si multer está recibiendo el archivo
    if (req.file) {
        console.log('Archivo recibido:', req.file);
    } else {
        console.log('No se recibió ningún archivo');
    }
  
    const imagen = req.file ? req.file.filename : req.body.imagenActual;

    if (!nombre || !precio || !descripcion) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }
    const updateData = { nombre, precio, descripcion };
    if (imagen) {
        updateData.imagen = imagen;
    }
    try {
        // Actualizar el producto con la nueva imagen
        const update = await productosModel.updateProductos(id, updateData);
        if (update.affectedRows > 0) {
         
            res.status(200).json({ message: "Producto actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}


export async function createProducto(req, res) {
    const { nombre, precio, descripcion} = req.body;
    const imagen = req.file ? req.file.filename : '';

    console.log('Imagen recibida:', imagen);  // Verifica el nombre de la imagen
    

    if (!nombre || !precio || !descripcion || !imagen) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        const create = await productosModel.createProducto({ nombre, precio, descripcion, imagen });
        if (create.insertId) {
            res.status(200).json( { message: "Producto Insertado Correctamente." });
            console.log("mochila insertada");
            
        } else {
            res.status(404).json( { message: "No se pudo crear el producto" });
        }
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json( { message: "Error al crear el producto", error: error.message });
    }
}

export async function deleteProducto(req, res) {
    const id  = req.params.id;

    try {
        const results = await productosModel.deleteProducto(id)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json( { message: "Error al eliminar el producto"})
        console.log(error);  
    }
}


export async function descontarStock(productoId, cantidad) {
    const query = `UPDATE mochila SET stock_mochila = stock_mochila - ? WHERE id_mochila = ? AND stock_mochila >= ?`;
    
    try {
        const [results] = await db.query(query, [cantidad, productoId, cantidad]);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function restarStock(req, res) {
    const { id } = req.params;
    const { cantidad } = req.body;

    // Verificación de cantidad válida
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).json({ message: "La cantidad debe ser un número positivo." });
    }

    try {
        // Llamamos a la función descontarStock para verificar el stock y restar
        const result = await productosModel.descontarStock(id, cantidad);

        // Si hay un error en el resultado (por ejemplo, falta de stock)
        if (result.error) {
            return res.status(400).json({ message: result.error });
        }

        // Si la operación fue exitosa, respondemos con un mensaje adecuado
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Compra completada y stock actualizado." });
        } else {
            res.status(400).json({ message: "No se pudo actualizar el stock." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el stock.", error: error.message });
    }
}
























export const verificarStock = async (req, res) => {
    console.log("Body recibido:", req.body); // 🛠️ Para depuración

    const { productos } = req.body;

    if (!productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: "La lista de productos es inválida o está vacía." });
    }

    try {
        for (const product of productos) {
            const [producto] = await db.query(
                "SELECT stock_mochila FROM mochila WHERE id_mochila = ?",
                [product.id_mochila]
            );

            if (producto.length === 0) {
                return res.status(400).json({ error: `Producto con ID ${product.id_mochila} no encontrado.` });
            }

            if (product.cantidad > producto[0].stock_mochila) {
                return res.status(400).json({
                    error: `No hay suficiente stock de ${product.nombre_mochila}.`,
                });
            }
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al verificar el stock.", details: error.message });
    }
};
