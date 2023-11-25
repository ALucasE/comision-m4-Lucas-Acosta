/*- - - - - - - - Configuración de variables de entornos - - - - - - - -*/
import dotenv from "dotenv";
dotenv.config();
export const configDotEnv = () => {
  return {
    port: process.env.PORT,
    mongo_uri: process.env.MONGODB_URI,
    jwt_secret: process.env.JWT_SECRET,
  };
};
/*- - - - - - - - - - - Ver archivo .env.example - - - - - - - - - - -*/
