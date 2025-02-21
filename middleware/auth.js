import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

export function verifyToken(req, res, next) {
    //const token = req.header('Authorization')?.replace('Bearer ', ''); // Asumiendo que el token se pasa en el header Authorization
    //const token = req.headers['authorization']?.split(' ')[1];
    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token inválido' });
    }
}
