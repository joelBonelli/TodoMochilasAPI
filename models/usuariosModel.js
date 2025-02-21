import db from '../db.js';
import bcrypt from 'bcrypt';


export async function getUsuarios() {
    const query = "SELECT * FROM usuario";
    try {
        const [results] = await db.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function getUsuarioEmail(email) {
    const query = "SELECT * FROM usuario WHERE correo_usuario = ?";
    try {
        const [results] = await db.query(query, [email]);
        return results.length > 0 ? results[0] : null;
    } catch (error) {
        throw error;
    }
}


export async function getUsuarioId(id) {
    const query = "SELECT * FROM usuario WHERE id_usuario = ?";
    try {
        const [results] = await db.query(query, [id]);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function createUsuario(date) {
    const {nombre, apellido, correo, dni, legajo, password, rol} = date;

    const query = `INSERT INTO usuario (nombre_usuario, apellido_usuario, dni_usuario, password_usuario, correo_usuario, nivel_usuario, legajo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    try{
        const [results] = await db.query(query, [nombre, apellido, dni, password, correo, rol, legajo]);
        return results;
    }catch (error){
        throw error;
    }
}


export async function updateUsuarios(id, data) {
    const {nombre, apellido, correo, dni, legajo, password, rol} = data;

    const query = `UPDATE usuario SET nombre_usuario = ?, apellido_usuario = ?, dni_usuario = ?, password_usuario = ?, correo_usuario = ?, nivel_usuario = ?, legajo_usuario = ? WHERE id_usuario = ?`;

    try {
        const [results] = await db.query(query, [nombre, apellido, dni, password, correo, rol, legajo, id]);
        return results;
    } catch (error) {
        throw error;
    }
}

export async function deleteUsuario(id) {
    const query = "DELETE FROM usuario WHERE id_usuario = ?";
    try {
        const [results] = await db.query(query, [id]);
        return results;
    } catch (error) {
        throw error;
    }
}


// export async function validatePassword(inputPassword, storedPassword) {
//     return inputPassword === storedPassword;
// }

export async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error("Error al hashear la contraseña");
    }
}

export async function validatePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}