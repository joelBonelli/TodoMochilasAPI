import express from "express";
import * as productosController from "../controllers/productosController.js"
import * as usuariosController from "../controllers/usuariosController.js"

const route = express.Router();

route.get("/productos", productosController.getProductos);
route.get("/productos/:id", productosController.getProductosId);
route.put("/productos/actualizar/:id", productosController.updateProductosId);

route.get("/usuarios/sesion", usuariosController.getUsuarios);
route.post("/usuarios/login", usuariosController.loginUsuario);

export default route;