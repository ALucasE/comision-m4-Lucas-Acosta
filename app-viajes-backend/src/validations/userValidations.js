import { body } from "express-validator";
import { UserModel } from "../models/user.model.js";

// Validación para el avatar
export const avatarValidation = body("avatar")
  .trim()
  .notEmpty()
  .withMessage("El campo avatar no puede estar vacío.")
  .isURL()
  .withMessage("Debe proporcionar una URL válida para el avatar.");

// Validación para el email
export const emailValidation = body("email")
  .trim()
  .notEmpty()
  .withMessage("El campo email no puede estar vacío.")
  .isEmail()
  .withMessage("Debe proporcionar una dirección de correo electrónico válida.")
  .custom(async (value) => {
    const existingUser = await UserModel.findOne({ email: value });
    if (existingUser) {
      throw new Error("Este correo electrónico ya está registrado.");
    }
    return true;
  });

// Validación para el password
export const passwordValidation = body("password")
  .notEmpty()
  .withMessage("El campo contraseña no puede estar vacío.")
  .isLength({ min: 8 })
  .withMessage("La contraseña debe tener al menos 8 caracteres.");

// Validación para el username
export const usernameValidation = body("username")
  .trim()
  .notEmpty()
  .withMessage("El campo nombre de usuario no puede estar vacío.")
  .custom(async (value) => {
    const existingUser = await UserModel.findOne({ username: value });
    if (existingUser) {
      throw new Error("Este nombre de usuario ya está en uso.");
    }
    return true;
  });

// Validación para el password
export const newPasswordValidation = body("newPassword")
  .notEmpty()
  .withMessage("El campo contraseña no puede estar vacío.")
  .isLength({ min: 8 })
  .withMessage("La contraseña debe tener al menos 8 caracteres.");
