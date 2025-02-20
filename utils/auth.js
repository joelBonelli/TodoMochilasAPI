import jwt from "jsonwebtoken";

// const secretKey = process.env.JWT_SECRET_KEY || 'tu_secreto';

// export function generateToken(payload) {
//     return jwt.sign(payload, secretKey, { expiresIn: '5s'});
// }


const secretKey = process.env.JWT_SECRET_KEY || 'tu_secreto';

export function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '20s' });
}

export function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' });
    }
}