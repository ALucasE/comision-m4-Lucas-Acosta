/*- - - - - - - - - - - - - - Imports - - - - - - - - - - - - - -*/
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
/*- - - - - - - - - - - Imports de configs y BD - - - - - - - - - -*/
import { startConnectionMongoDB } from "./src/config/mongoose.config.js";
import { configDotEnv } from "./src/config/dotenv.config.js";
const { port } = configDotEnv();

/*- - - - - - - - - - - - Imports de Rutas - - - - - - - - - - - -*/
import { authRouter } from "./src/routes/auth.routes.js";
import { postRouter } from "./src/routes/post.routes.js";
import { commentRouter } from "./src/routes/comment.routes.js";
/*- - - - - - - - - - - - - - - APP - - - - - - - - - - - - - - -*/
const app = express();

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
app.use(cookieParser());

/*- - - - - - - - - - - - - - - Rutas - - - - - - - - - - - - - - - -*/
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/comments", commentRouter);

/*- - - - - - - - Inicia el servidor y Conexión a la base de datos MongoDB - - - - - - - -*/

app.listen(port, () => {
  startConnectionMongoDB();
  console.log(`Servidor en ejecución en: http://localhost:${port}`);
});
