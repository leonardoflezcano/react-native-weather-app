import nodemailer from 'nodemailer';
import {CorreosEnviados} from '../models/model_correo.js'
import {generarEnviarCodigo,  verificarCodigo} from '../models/model_auth.js'

export const getAllCorreosEnviados = async (req, res) => {
  try {
    const correosEnviados = await CorreosEnviados.findAll();
    res.status(200).json(correosEnviados);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los correos enviados');
  }
};

export const enviarCorreoSoporte = async (req, res) => {
  try {
    const { email, subject, message, name } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ramsheedkk06@gmail.com',
        pass: 'ahyetfzwdgpgxcmc',
      },
    });

    await CorreosEnviados.create({
      to: email,
      subject,
      message,
      name
    });

    // Detalles del correo
    const mailDetails = {
      to: email,
      subject,
      text: message,
      html: `<h1>${subject}</h1>
        <p>${message}</p>
        <p>Gracias por informarnos del problema, ${req.body.name}</p>
        <p>Se ha registrado su informarcion, les estaremos comunicando cuando soluciamos el problema/p>`,
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailDetails);
    console.log('Email sent: ' + info.response);

    // Responder al cliente con éxito
    res.send('¡Correo enviado con éxito!');
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).send('Error al enviar el correo');
  }
};

//Auth

export const GenerarEnviarCodigo = async (req, res) => {
  const { correo } = req.body; // Utiliza req.body para obtener el correo

  try {
    const enviado = await generarEnviarCodigo(correo);

    if (enviado) {
      return res.status(200).json({ mensaje: "Código enviado exitosamente" });
    } else {
      return res.status(400).json({ mensaje: "No se pudo enviar el código" });
    }
  } catch (error) {
    console.error("Error en el controlador de generar y enviar código:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const verificarCodigoController = async (req, res) => {
  const { correo, codigo } = req.body;

  try {
    // Verifica si el código proporcionado es correcto
    const codigoValido = await verificarCodigo(correo, codigo);

    if (codigoValido) {
      return res.status(200).json({ mensaje: "Código verificado correctamente" });
    } else {
      return res.status(400).json({ mensaje: "Código inválido o expirado" });
    }
  } catch (error) {
    console.error("Error en el controlador de verificar código:", error);
    return res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
