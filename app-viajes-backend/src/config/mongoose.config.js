/*- - - - - - - - configuración de la conexión a la base de datos MongoDB - - - - - - - -*/
import mongoose from "mongoose";
import { configDotEnv } from "./dotenv.config.js";
const { mongo_uri } = configDotEnv();

export const startConnectionMongoDB = async () => {
  try {
    console.log("Conectado a la base de datos...");
    await mongoose.connect(mongo_uri);

    console.log(`Se estableció correctamente la conexión a la Base de datos`);
  } catch (error) {
    console.error("No se pudo establecer la conexión a la base de datos", error);
  }
};
