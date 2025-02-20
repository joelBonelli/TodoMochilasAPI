import bcrypt from "bcrypt";
import db from "./db.js"; // Importar la conexión a la base de datos

async function encryptExistingPasswords() {
    try {
        // Obtener todos los usuarios con sus contraseñas
        const [usuarios] = await db.query("SELECT id_usuario, password_usuario FROM usuario");

        for (const usuario of usuarios) {
            if (!usuario.password_usuario.startsWith("$2b$")) { // Evitar encriptar dos veces
                const hashedPassword = await bcrypt.hash(usuario.password_usuario, 10);
                await db.query("UPDATE usuario SET password_usuario = ? WHERE id_usuario = ?", [hashedPassword, usuario.id_usuario]);
                console.log(`Contraseña encriptada para el usuario ID: ${usuario.id_usuario}`);
            }
        }

        console.log("✅ Todas las contraseñas han sido encriptadas.");
    } catch (error) {
        console.error("❌ Error al encriptar contraseñas:", error);
    } finally {
        process.exit();
    }
}

encryptExistingPasswords();
