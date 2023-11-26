import jwt from "jsonwebtoken";
import { configDotEnv } from "../config/dotenv.config.js";
const { jwt_secret } = configDotEnv();

export const validateAccessToken = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ msg: "Acceso no autorizado. Falta el token de autenticación." });
  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.status(403).json({ msg: "Acceso no autorizado. Token no válido." });
    req.userId = user.payload.id;
  });
  next();
};
