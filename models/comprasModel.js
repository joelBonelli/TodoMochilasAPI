import db from '../db.js';

// Registrar una nueva compra en la base de datos
export async function registrarCompra(usuarioId) {
    const query = "INSERT INTO compras (usuario_id, fecha) VALUES (?, NOW())";
    
    try {
        const [results] = await db.query(query, [usuarioId]);
        return results;
    } catch (error) {
        throw error;
    }
}

// Registrar los productos comprados en la tabla de detalles de compra
export async function registrarDetalleCompra(compraId, productoId, cantidad) {
    const query = "INSERT INTO detalle_compra (compra_id, producto_id, cantidad) VALUES (?, ?, ?)";
    
    try {
        const [results] = await db.query(query, [compraId, productoId, cantidad]);
        return results;
    } catch (error) {
        throw error;
    }
}
