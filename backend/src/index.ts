import express, { Request, RequestHandler, Response } from 'express';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de multer para manejo de archivos
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

// Ruta de prueba para confirmar que el servidor está funcionando
app.get('/', (_req: Request, res: Response) => {
    res.send('Servidor funcionando');
});

const uploadFileHandler: RequestHandler = (req, res) => {
  if (!req.file) {
      res.status(400).send('No se subió ningún archivo');
      return;
  }

  res.send('Archivo subido con éxito');
};

// Ruta para cargar el archivo CSV
app.post('/upload', upload.single('file'), (uploadFileHandler));

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
