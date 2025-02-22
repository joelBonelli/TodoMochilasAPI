import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

export function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    console.log("Token recibido en el servidor:", token);

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token faltante' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}
