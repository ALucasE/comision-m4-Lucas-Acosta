import { UserModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { createAccessToken } from "../utils/jwt.create.js";
import jwt from "jsonwebtoken";
//import { configDotEnv } from "../config/dotenv.config.js";
//const { jwt_secret } = configDotEnv();

/*                     REGISTRO DE UN NUEVO USUARIO               */
export const signUp = async (req, res) => {
  try {
    // Verificar si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Se toman valores del body
    const { username, email, password, avatar } = req.body;
    //Se crea el usuario
    const newUser = new UserModel({
      username,
      email,
      avatar,
      password: await UserModel.encryptPassword(password),
    });
    //Se aguarda el nuevo usuario creado
    const nuevoUsuario = await newUser.save();
    // // Opción con Token de JWT
    // const token = await createAccessToken({id: nuevoUsuario._id})
    // res.status(201).cookie("token", token).json({
    //   msg: "Usuario registrado exitosamente.",
    //   id: nuevoUsuario._id,
    //   username: nuevoUsuario.username,
    //   email: nuevoUsuario.email
    // })
    res.status(201).json({
      msg: "Usuario registrado exitosamente.",
      id: nuevoUsuario._id,
      username: nuevoUsuario.username,
      email: nuevoUsuario.email,
    });
    //Opción 02
    //res.status(201).json({ message: 'Usuario registrado exitosamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "No se pudo crear usuario" });
  }
};

/*                     LOGIN DE UN USUARIO CREADO              */

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const usuario = await UserModel.findOne({ username });
    // Verificar si el usuario existe
    if (!usuario) {
      return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos." });
    }

    // Verificar la contraseña
    const verifyPass = await UserModel.comparePassword(password, usuario.password);
    if (!verifyPass) {
      return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos." });
    }
    // Genera el Token
    const token = await createAccessToken({ id: usuario._id });
    res.status(201).cookie("token", token).json({
      msg: "Usuario registrado exitosamente.",
      id: usuario._id,
      username: usuario.username,
      email: usuario.email,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

/*                     LOGIN DE UN USUARIO CREADO              */
export const logout = async (req, res) => {
  //Se borran los datos de los cookies
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).json({ message: "Cierre de sesión exitoso." });
};

/*                         CAMBIAR CONTRASEÑA                 */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, userId } = req.body;
    // Verificar si hay errores de validación en la nueva contraseña
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Buscar al usuario por ID
    const usuario = await UserModel.findById(userId);
    // Verificar la contraseña
    const verifyPass = await UserModel.comparePassword(oldPassword, usuario.password);
    if (!verifyPass) {
      return res.status(401).json({ message: "La antigua contraseña no coincide." });
    }
    // Encriptar y actualizar la contraseña
    usuario.password = await UserModel.encryptPassword(newPassword);

    // Guardar el usuario actualizado en la base de datos
    await usuario.save();
    res.status(200).json({ message: "Contraseña cambiada exitosamente." });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error al intentar cambiar contraseña" });
  }
};

/*                     VER DATOS DEL USUARIO              */
export const getUserById = async (req, res) => {
  //Se borran los datos de los cookies
  try {
    // const { userId } = req.params;
    const usuario = await UserModel.findById(req.userId);

    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }

    // Información personalizada qué información a enviar
    const userProfile = {
      username: usuario.username,
      email: usuario.email,
      avatar: usuario.avatar,
    };

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error al ver el perfil del usuario:", error.message);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};
