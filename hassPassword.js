import bcrypt from "bcrypt";

const password = "40143488"; // Coloca la contraseña original

async function hashPassword() {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Nuevo Hash:", hashedPassword);
}

hashPassword();
