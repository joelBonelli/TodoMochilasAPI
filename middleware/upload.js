import multer from 'multer';
import path from 'path';
import fs from 'fs';

const rootPath = path.resolve();
const imagesFolder = path.join(rootPath, 'public/images');

// Verificar si la carpeta existe, si no, crearla
if (!fs.existsSync(imagesFolder)) {
    fs.mkdirSync(imagesFolder, { recursive: true });
}

// Configuración de multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Las imágenes se guardarán en 'public/images'
        cb(null, imagesFolder); // Usa la carpeta creada o asegurada
    },
    filename: (req, file, cb) => {
        // El nombre del archivo será único usando la fecha actual
        cb(null, file.originalname);
    }
});

// Validación para permitir solo ciertos tipos de imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes con extensiones jpg, jpeg, png o gif.'));
    }
};

// Configuración de multer con límite de tamaño de 50MB
const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Límite de 50MB por archivo
    fileFilter
});

// Exportar la configuración de multer
export default upload;
