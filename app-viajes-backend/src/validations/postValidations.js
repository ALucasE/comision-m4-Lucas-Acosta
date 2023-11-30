import { body } from "express-validator";

// Validación para el title
export const titleValidation = body("title").trim().notEmpty().withMessage("El campo titulo no puede estar vacío.");

// Validación para la description
export const descriptionValidation = body("description").trim().notEmpty().withMessage("El campo descripción no puede estar vacío.");

// Validación para el imageURL
export const imageValidation = body("imageURL")
  .trim()
  .notEmpty()
  .withMessage("El campo de la imagen no puede estar vacío.")
  .isURL()
  .withMessage("Debe proporcionar una URL válida para la imagen.");
