import * as usuariosModel from "../models/usuariosModel.js";

export async function getUsuarios(req, res) {
    try {
            const results = await usuariosModel.getUsuarios()
            res.status(200).json(results);
        } catch (error) {
            res.status(500).json( { message: "Error al recuperar los datos"});
        }
}


export async function loginUsuario(req, res) {
    const { email, password } = req.body; 
    try {
        const usuario = await usuariosModel.getUsuarioEmail(email);

        if (!usuario) {
            return res.status(401).json( { message: "Correo electrónico incorrectos"});
        }
        const isPasswordValid = await usuariosModel.validatePassword(password, usuario.password_usuario);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Correo contraseña incorrectos" });
        }
        //Si la autenticación es exitosa, puedes devolver los datos del usuario
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
}






   // try {
    //     const results = await usuariosModel.getUsuarioEmail(correo_usuario);
    //     if (!results) {
    //         return res.status(401).json({ message: "Correo electrónico incorrecto" });
    //     }
    //     res.status(200).json(results);
    // } catch (error) {
    //     res.status(500).json( { message: "Error al recuperar los datos"});
    // }