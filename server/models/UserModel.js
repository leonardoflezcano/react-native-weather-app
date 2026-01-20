// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define el esquema del modelo de usuario
const UserSchema = new mongoose.Schema({
  nombre_completo: {
    type: String,
    required: true,
    trim: true, 
  },
  username: {
    type: String,
    required: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  fotoUser: {
    type: String, 
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar contraseñas
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Error al comparar contraseñas');
  }
};

// Crea y exporta el modelo de usuario
const User = mongoose.model('User', UserSchema);

//prueba correo

export const LoginOneUsers=async (correo)=>{
  return await Auth.findOne({where:{correo}})
}

//generarEnviarcodigo
export const generarEnviarCodigo = async (correo) => {
  try {
    // Genera un código de recuperación
    const codigoRecuperacion = Math.floor(100000 + Math.random() * 900000);

    // Obtén el usuario por su correo
    const usuario = await Auth.findOne({ where: { correo } });

    // Si el usuario existe, actualiza el código y la expiración
    if (usuario) {
      await usuario.update({
        codigoRecuperacion,
        codigoRecuperacionExpiracion: new Date(Date.now() + 600000), // Expira en 10 minutos
      });

      // Configura el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ramsheedkk06@gmail.com', // Coloca tu dirección de correo electrónico de Gmail
          pass: 'ahyetfzwdgpgxcmc', // Coloca tu contraseña de Gmail o una contraseña de aplicación específica si tienes la autenticación de dos factores activada
        },
      });

      // Configura el contenido del correo
      const mailOptions = {
        from: 'ramsheedkk06@gmail.com',
        to: correo,
        subject: 'Código de recuperación de contraseña',
        text: `Tu código de recuperación es: ${codigoRecuperacion}`,
      };

      // Envía el correo
      await transporter.sendMail(mailOptions);

      console.log(`Código ${codigoRecuperacion} enviado al correo ${correo}`);
      return true;
    } else {
      console.log(`No se encontró el usuario con el correo ${correo}`);
      return false;
    }
  } catch (error) {
    console.error("Error al generar y enviar código de recuperación:", error);
    throw error;
  }
};

export const verificarCodigo = async (correo, codigo) => {
  try {
    // Obtén el usuario por su correo
    const usuario = await Auth.findOne({ where: { correo } });

    // Verifica si el usuario existe y si el código coincide y no ha expirado
    if (
      usuario &&
      usuario.codigoRecuperacion === codigo &&
      usuario.codigoRecuperacionExpiracion > Date.now()
    ) {
      // Código válido
      console.log(`Código ${codigo} verificado para el correo ${correo}`);
      return true;
    } else {
      // Código inválido o expirado
      console.log(`Código inválido o expirado para el correo ${correo}`);
      return false;
    }
  } catch (error) {
    console.error("Error al verificar código de recuperación:", error);
    throw error;
  }
};

export default User;
