import express from "express";
import upload from '../middleware/upload.js';
import * as productosController from "../controllers/productosController.js"
import * as usuariosController from "../controllers/usuariosController.js"
import { verifyToken } from "../middleware/auth.js";


const route = express.Router();

// PRODUCTOS
route.get("/productos", productosController.getProductos);
route.get("/productos/:id", productosController.getProductosId);
route.post("/productos/create", upload.single('imagen'), verifyToken, productosController.createProducto);
route.put("/productos/actualizar/:id", upload.single('imagen'), verifyToken, productosController.updateProductosId);
route.delete("/productos/delete/:id", verifyToken, productosController.deleteProducto);
route.put('/productos/:id/restar-stock', productosController.restarStock);



// USUARIOS
route.get("/usuarios", usuariosController.getUsuarios);
route.get("/usuarios/:id", usuariosController.getUsuariosId);

route.post("/usuarios/create", upload.none(), verifyToken, usuariosController.createUsuario);
route.put("/usuarios/actualizar/:id",upload.none(), verifyToken, usuariosController.updateUsuariosId);
route.delete("/usuarios/delete/:id", verifyToken,usuariosController.deleteUsuario);
route.post("/usuarios/register", upload.none(), usuariosController.createUsuario);
route.get("/usuarios/sesion", usuariosController.getUsuarios);
route.post("/usuarios/login", usuariosController.loginUsuario);

export default route;