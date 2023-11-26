import { body } from "express-validator";

// Validación para la description
export const descriptionValidation = body("description").trim().notEmpty().withMessage("El campo descripción no puede estar vacío.");
