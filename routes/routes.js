import express from "express";
import upload from '../middleware/upload.js';
import * as productosController from "../controllers/productosController.js"
import * as usuariosController from "../controllers/usuariosController.js"
import { verifyToken } from "../middleware/auth.js";

const route = express.Router();

// PRODUCTOS
route.get("/productos", productosController.getProductos);
route.get("/productos/:id", productosController.getProductosId);
// route.post("/productos/create", productosController.createProducto);
route.post("/productos/create", upload.single('imagen'), verifyToken, productosController.createProducto);
route.put("/productos/actualizar/:id", upload.single('imagen'), verifyToken, productosController.updateProductosId);
route.delete("/productos/delete/:id", verifyToken, productosController.deleteProducto);


// USUARIOS
route.get("/usuarios", usuariosController.getUsuarios);
route.get("/usuarios/:id", usuariosController.getUsuariosId);
route.put("/usuarios/actualizar/:id",upload.none(), usuariosController.updateUsuariosId);
route.post("/usuarios/create", upload.none(), usuariosController.createUsuario);
route.delete("/usuarios/delete/:id", usuariosController.deleteUsuario);
route.get("/usuarios/sesion", usuariosController.getUsuarios);
route.post("/usuarios/login", usuariosController.loginUsuario);

export default route;