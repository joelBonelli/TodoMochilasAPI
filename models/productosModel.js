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