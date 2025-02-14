import * as productosModel from "../models/productosModel.js";


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
    const { nombre, precio, descripcion, imagen } = req.body;

    try {
        // AQUI HAY QUE VALIDAR LOS DATOS

        const update = await productosModel.updateProductos(id, { nombre, precio, descripcion, imagen} );

        if (update.affectedRows > 0) {
            res.status(200).json( { message: "Producto actualizado correctamente"});
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }

    } catch (error) {
        res.status(500).json( { message: "Error al recuperar el dato del producto"})
    }
}