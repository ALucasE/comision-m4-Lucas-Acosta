import jwt from "jsonwebtoken";
import { configDotEnv } from "../config/dotenv.config.js";
const { jwt_secret } = configDotEnv();

export const validateAccessToken = (req, res, next) => {
  // const token = req.headers.Authorization;
  //const { token } = req.cookies;
  const { token } = req.body;
  console.log("Token: ", token, "req.header: ", req.header);
  if (!token) return res.status(401).json({ msg: "Acceso no autorizado. Falta el token de autenticación." });
  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) return res.status(403).json({ msg: "Acceso no autorizado. Token no válido." });
    req.userId = user.payload.id;
  });
  next();
};
