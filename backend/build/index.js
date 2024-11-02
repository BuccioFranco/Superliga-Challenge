"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Configuración de multer para manejo de archivos
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use(express_1.default.json());
// Ruta de prueba para confirmar que el servidor está funcionando
app.get('/', (_req, res) => {
    res.send('Servidor funcionando');
});
// Ruta para cargar el archivo CSV
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }
    // Aquí luego procesaremos el archivo CSV
    res.send('Archivo subido con éxito');
});
// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
