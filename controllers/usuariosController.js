import * as usuariosModel from "../models/usuariosModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

export async function getUsuarios(req, res) {
    try {
        const results = await usuariosModel.getUsuarios()
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
}


export async function getUsuariosId(req, res) {
    const id = req.params.id

    console.log(id)

    try {
        const results = await usuariosModel.getUsuarioId(id)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ message: "Error al recuperar el dato del usuario" })
    }
}


export async function updateUsuariosId(req, res) {
    const id = req.params.id;
    const { correo, nombre, apellido, dni, rol, legajo } = req.body;

    console.log(id)

    if (!correo || !nombre || !apellido || !dni || !rol || !legajo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const updateData = { correo, nombre, apellido, dni, rol, legajo };
    try {
        const update = await usuariosModel.updateUsuarios(id, updateData);
        if (update.affectedRows > 0) {
            res.status(200).json({ message: "Usuario actualizado correctamente" });
        } else {
            res.status(404).json({ message: "No se pudo actualizar el usuario" });
        }
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
}




export async function loginUsuario(req, res) {
    const { email, password } = req.body;
    console.log("Contraseña ingresada:", password); // 🔍 Verifica qué está llegando

    try {
        const usuario = await usuariosModel.getUsuarioEmail(email);

        if (!usuario) {
            return res.status(401).json({ message: "Correo Electrónico o Contraseña Incorrectos" });
        }

        console.log("Contraseña en BD:", usuario.password_usuario); // 🔍 Verifica la contraseña encriptada

        const isPasswordValid = await usuariosModel.validatePassword(password, usuario.password_usuario);

        if (!isPasswordValid) {
            console.log("❌ Contraseña incorrecta");
            return res.status(401).json({ message: "Correo Electrónico o Contraseña Incorrectos" });
        }
        console.log("✅ Contraseña correcta");

        const playload = {
            nombre_usuario: usuario.nombre_usuario,
            apellido_usuario: usuario.apellido_usuario,
            nivel_usuario: usuario.nivel_usuario,
        }

        const token = jwt.sign(playload, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.status(200).json({ token, user: playload });

    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
        console.log(error);

    }
}

export async function deleteUsuario(req, res) {
    const id = req.params.id;

    try {
        const results = await usuariosModel.deleteUsuario(id);
        res.status(200).json(results)
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario" });
        console.log(error);
    }
}

export async function createUsuario(req, res) {
    const { correo, nombre, apellido, dni, password, rol, legajo } = req.body;

    if (!correo || !nombre || !password || !rol || !apellido || !dni || !legajo) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await usuariosModel.getUsuarioEmail(correo);
        if (existingUser) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Hashear la contraseña antes de enviarla al modelo
        const hashedPassword = await usuariosModel.hashPassword(password);

        // Insertar usuario
        const create = await usuariosModel.createUsuario({
            nombre,
            apellido,
            dni,
            password: hashedPassword,
            correo,
            rol,
            legajo
        });

        if (create.insertId) {
            res.status(200).json({ message: "Usuario creado correctamente" });
        } else {
            res.status(500).json({ message: "No se pudo crear el usuario" });
        }
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
}


