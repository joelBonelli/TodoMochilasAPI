import express from "express";
import upload from '../middleware/upload.js';
import * as productosController from "../controllers/productosController.js"
import * as usuariosController from "../controllers/usuariosController.js"

const route = express.Router();

route.get("/productos", productosController.getProductos);
route.get("/productos/:id", productosController.getProductosId);
//route.put("/productos/actualizar/:id", productosController.updateProductosId);
// route.post("/productos/create", productosController.createProducto);
route.post("/productos/create", upload.single('imagen'), productosController.createProducto);
route.post("/productos/actualizar/:id", upload.single('imagen'), productosController.updateProductosId);
route.delete("/productos/delete/:id", productosController.deleteProducto);

route.get("/usuarios/sesion", usuariosController.getUsuarios);
route.post("/usuarios/login", usuariosController.loginUsuario);

export default route;