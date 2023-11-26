import jwt from "jsonwebtoken";
import { configDotEnv } from "../config/dotenv.config.js";
const { jwt_secret } = configDotEnv();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    console.log("Clave secreta: ", jwt_secret, "Payload: ", payload);
    jwt.sign({ payload }, jwt_secret, { expiresIn: "1h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};
