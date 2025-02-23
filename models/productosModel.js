import db from '../db.js';
import * as productosModel from "../models/productosModel.js";

export async function getProductos() {
    const query = "SELECT * FROM mochila";
    try {
        const [results] = await db.query(query);
        const IMAGE_BASE_URL = 'http://localhost:8888/images/';
        results.forEach(producto => {
            producto.foto_mochila = IMAGE_BASE_URL + producto.foto_mochila;
        });
        return results;
    } catch (error) {
        throw error;
    }
}


export async function getProductosId(id) {
    const query = "SELECT * FROM mochila WHERE id_mochila = ?";
    try {
        const [results] = await db.query(query, [id]);
        const IMAGE_BASE_URL = 'http://localhost:8888/images/';  // Asegúrate de usar la URL correcta

        if (results.length > 0) {
            results[0].foto_mochila = IMAGE_BASE_URL + results[0].foto_mochila;
           // results[0];
        }
        return results
    } catch (error) {
        throw error
    }
}


export async function updateProductos(id, data){
    const { nombre, precio, descripcion, imagen } = data;
    // Valores fijos
   // const stock = 100; // Valor fijo para 'stock'
    const proveedorId = 1; // Valor fijo para 'proveedorId'

    const query = `UPDATE mochila SET nombre_mochila = ?, precio_mochila = ?, stock_mochila = ?, descripcion_mochila = ?, proveedor_id_proveedor = ?, foto_mochila = ? WHERE id_mochila = ? `;

    try {
        const [results] = await db.query(query, [nombre, precio, stock, descripcion, proveedorId, imagen, id]);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function createProducto(date) {
    const { nombre, precio, descripcion, imagen } = date;
    const stock = 100;
    const proveedorId = 1;
    const query = `INSERT INTO mochila (nombre_mochila, precio_mochila, stock_mochila, descripcion_mochila, proveedor_id_proveedor, foto_mochila) VALUES (?, ?, ?, ?, ?, ?)`;

    try {
        const [results] = await db.query(query, [nombre, precio, stock, descripcion, proveedorId, imagen ]);
        return results;
    } catch (error) {
        throw error;
    }
}


export async function deleteProducto(id) {
    const query = "DELETE FROM mochila WHERE id_mochila = ?";

    try {
        const [results] = await db.query(query, [id]);
        return results
    } catch (error) {
        throw error
    }
}


export async function descontarStock(productoId, cantidad) {
    // Consulta el stock disponible
    const stockQuery = "SELECT stock_mochila FROM mochila WHERE id_mochila = ?";
    
    try {
        const [producto] = await db.query(stockQuery, [productoId]);
        
        if (producto.length === 0) {
            return { error: "Producto no encontrado" };
        }

        const stockDisponible = producto[0].stock_mochila;

        // Verifica si hay suficiente stock
        if (cantidad > stockDisponible) {
            return { error: "No hay suficiente stock disponible." };
        }

        // Si hay suficiente stock, actualizamos el stock
        const query = `UPDATE mochila SET stock_mochila = stock_mochila - ? WHERE id_mochila = ?`;
        const [results] = await db.query(query, [cantidad, productoId]);

        return results;
    } catch (error) {
        throw error;
    }
}


// Controlador para restar stock
// Restar stock verificando disponibilidad
export async function restarStock(productoId, cantidad) {
    try {
        // Obtener el producto para verificar el stock
        const producto = await getProductosId(productoId);

        if (!producto) {
            return { error: "Producto no encontrado." };
        }

        if (cantidad > producto.stock_mochila) {
            return { error: `No hay suficiente stock de ${producto.nombre_mochila}.` };
        }

        // Si hay suficiente stock, proceder con la actualización
        const query = "UPDATE mochila SET stock_mochila = stock_mochila - ? WHERE id_mochila = ?";
        const [results] = await db.query(query, [cantidad, productoId]);

        return results;
    } catch (error) {
        throw error;
    }
}