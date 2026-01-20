import User from '../models/UserModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const ctrlGetUserInfoByToken = async (req, res) => {
  const tokenHeader = req.headers["authorization"];
  console.log("tokenHeader: ", tokenHeader);

  try {
    if (!tokenHeader) {
      return res.status(401).json({ message: "No existe un token" });
    }

    // Extraer el token sin el prefijo "Bearer"
    const token = tokenHeader.replace("Bearer ", "");
    console.log("token recibido: ", token);

    try {
      // Decodificar el token
      const decodedToken = verifyToken(token);
      console.log("token decodificado: ", decodedToken);

      // Verifica que el token decodificado tiene un `id`
      if (!decodedToken || !decodedToken.id) {
        return res.status(401).json({ message: "Token inválido: no se encontró el id de usuario" });
      }

      // Convertir el id a número
      const userId = parseInt(decodedToken.id, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "ID de usuario inválido en el token" });
      }

      console.log("userId decodificado: ", userId);

      // Buscar al usuario en la base de datos usando el userId decodificado
      const user = await UserService.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Retornar la información del usuario
      res.status(200).json(user);
    } catch (error) {
      console.error("Error al verificar el token:", error.message);
      return res.status(401).json({ message: "Token inválido" });
    }
  } catch (outerError) {
    console.error("Error general:", outerError);
    res.status(500).json({ message: "Error interno del servidor", error: outerError.message });
  }
};

// Controlador para el registro de usuarios
export const register = async (req, res) => {
  const { nombre_completo, username, email, password, confirmPassword } = req.body;

  // Validar que todos los campos estén presentes
  if (!nombre_completo || !username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ nombre_completo, username, email, password });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar el token y el ID del usuario en la respuesta
    res.status(201).json({ token, userId: newUser._id });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para el inicio de sesión de usuarios
export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validar que todos los campos estén presentes
  if (!email || !password) {
    return res.status(400).json({ error: 'Por favor, complete todos los campos' });
  }

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Correo electrónico no encontrado' });
    }

    // Comparar la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token de autenticación
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Enviar el token y el ID del usuario en la respuesta
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error('Error en el inicio de sesión:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  try {
    const user = await User.findById(id); // Buscar el usuario por ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user); // Enviar los datos del usuario encontrado
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtener todos los usuarios
    res.status(200).json(users); // Enviar los datos de todos los usuarios
  } catch (err) {
    console.error('Error al obtener los usuarios:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros de la solicitud
  const { nombre_completo, username, email, password } = req.body; // Obtener los nuevos datos del usuario

  try {
    const user = await User.findById(id); // Buscar el usuario por ID
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Actualizar los campos del usuario si se proporcionan nuevos datos
    if (nombre_completo) user.nombre_completo = nombre_Completo;
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10); // Encriptar nueva contraseña si es proporcionada

    await user.save(); // Guardar los cambios en la base de datos
    res.status(200).json({ message: 'Usuario actualizado correctamente', user });
  } catch (err) {
    console.error('Error al actualizar el usuario:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
};


