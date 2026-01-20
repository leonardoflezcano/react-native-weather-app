import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import {__dirname} from "./helpers/ruta.js"
import { fileURLToPath } from 'url';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import noticiasRoutes from './routes/noticiasRoutes.js';
import uploadRoutes from './routes/subir_foto.js';

dotenv.config();

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./tmp"
})); // Habilitar el middleware de subida de archivos

// Rutas estáticas para servir imágenes
app.use('/public', express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos desde la carpeta public

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/noticia', noticiasRoutes);
app.use('/api/upload', uploadRoutes);

// Conectar a MongoDB
//mongoose.connect(process.env.MONGO_URI)
 // .then(() => console.log('MongoDB connected'))
  //.catch(err => console.error('MongoDB connection error:', err));

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});




