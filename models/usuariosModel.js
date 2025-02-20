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

// export async function validatePassword(inputPassword, storedPassword) {
//     return inputPassword === storedPassword;
// }


export async function validatePassword(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}



