// import jwt from 'jsonwebtoken';

// const secretKey = process.env.JWT_SECRET_KEY || 'tu_secreto';

// export function verifyToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(" ")[1]; 

//     if (!token) {
//         return res.status(403).json({ message: "No token provided" });
//     }

//     jwt.verify(token, secretKey, (err, decoded) => {
//         if (err) {
//         if (err.name === 'TokenExpiredError') {
//             return res.status(401).json({ message: "Token expirado" });
//         }
//         return res.status(401).json({ message: "Token inválido" });
//     }
    

//         req.userId = decoded.id;
//         next();
//     });
// }
