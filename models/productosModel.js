import db from '../db.js';

export async function getProductos() {
    const query = "SELECT * FROM mochila";
    try {
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}


export async function getProductosId(id) {
    const query = "SELECT * FROM mochila WHERE id_mochila = ?";
    try {
        const [results] = await db.query(query, [id])
        return results
    } catch (error) {
        throw error
    }
}


export async function updateProductos(id, data){
    const { nombre, precio, descripcion, imagen } = data;
    // Valores fijos
    const stock = 100; // Valor fijo para 'stock'
    const proveedorId = 1; // Valor fijo para 'proveedorId'

    const query = `UPDATE mochila SET nombre_mochila = ?, precio_mochila = ?, stock_mochila = ?, descripcion_mochila = ?, proveedor_id_proveedor = ?, foto_mochila = ? WHERE id_mochila = ? `;

    try {
        const [results] = await db.query(query, [nombre, precio, stock, descripcion, proveedorId, imagen, id]);
        return results;
    } catch (error) {
        throw error;
    }
}