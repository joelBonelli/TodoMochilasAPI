import bcrypt from "bcrypt";
import db from "./db.js"; // Importar la conexión a la base de datos

async function encryptExistingPasswords() {
    try {
        // Obtener todos los usuarios con sus contraseñas
        const [usuarios] = await db.query("SELECT id_usuario, password_usuario FROM usuario");

        for (const usuario of usuarios) {
            const hashedPassword = await bcrypt.hash(usuario.password_usuario, 10);
            
            console.log(`🔒 ID: ${usuario.id_usuario} - Nueva contraseña: ${hashedPassword} (longitud: ${hashedPassword.length})`);

            await db.query("UPDATE usuario SET password_usuario = ? WHERE id_usuario = ?", [hashedPassword, usuario.id_usuario]);
            console.log(`✅ Contraseña encriptada para el usuario ID: ${usuario.id_usuario}`);
        }

        console.log("✅ Todas las contraseñas han sido encriptadas correctamente.");
    } catch (error) {
        console.error("❌ Error al encriptar contraseñas:", error);
    } finally {
        process.exit();
    }
}

encryptExistingPasswords();
