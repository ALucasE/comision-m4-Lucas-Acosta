/*- - - - - - - - - - - - - - Imports - - - - - - - - - - - - - -*/
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { startConnectionMongoDB } from "./src/config/mongoose.config.js";
import { configDotEnv } from "./src/config/dotenv.config.js";
const { port } = configDotEnv();
/*- - - - - - - - - - - - - Imports Rutas - - - - - - - - - - - - -*/

/*- - - - - - - - - - - - - Imports Rutas - - - - - - - - - - - - -*/
const app = express();
startConnectionMongoDB();

/*- - - - - - - - - - - - - - Middleware - - - - - - - - - - - - - -*/
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*- - - - - - - - - - - - - - - Rutas - - - - - - - - - - - - - - - -*/

/*- - - - - - - - Iniciar el servidor y Conexión a la base de datos MongoDB - - - - - - - -*/

app.listen(port, () => {
  console.log(`Servidor en ejecución en: http://localhost: ${port}`);
});
