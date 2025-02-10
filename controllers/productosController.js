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