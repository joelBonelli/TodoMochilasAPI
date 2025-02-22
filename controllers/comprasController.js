import * as productosModel from "../models/productosModel.js";
import * as comprasModel from "../models/comprasModel.js";

export async function realizarCompra(req, res) {
    const { usuarioId, productos } = req.body; 

    if (!usuarioId || !productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "Datos incompletos o formato incorrecto." });
    }

    try {
        // 1. Registrar la compra en la base de datos
        const compra = await comprasModel.registrarCompra(usuarioId);
        const compraId = compra.insertId; // Obtiene el ID de la compra recién creada

        // 2. Registrar los productos de la compra y descontar el stock
        for (const producto of productos) {
            const { id, cantidad } = producto;

            // Registrar cada producto en la compra
            await comprasModel.registrarDetalleCompra(compraId, id, cantidad);

            // Descontar el stock del producto
            const resultado = await productosModel.descontarStock(id, cantidad);

            if (resultado.affectedRows === 0) {
                return res.status(400).json({ message: `No hay suficiente stock para el producto con ID ${id}.` });
            }
        }

        res.status(200).json({ message: "Compra realizada con éxito." });
    } catch (error) {
        console.error("Error en la compra:", error);
        res.status(500).json({ message: "Error al procesar la compra." });
    }
}
