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

export const restarStock = async (id, cantidad) => {
        const query = `UPDATE mochila SET stock_mochila = stock_mochila - ? WHERE id_mochila = ?`;
        try {
            const [results] = await db.query(query, [cantidad, id]);
            return results;
        } catch (error) {
            throw error;
        }
};

