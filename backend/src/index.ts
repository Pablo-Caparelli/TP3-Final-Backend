import express from "express";
import { productRouter } from "./routes/productRouter";
import { connectDb } from "./config/connectMongoDb";
import cors from "cors";
import { authRouter } from "./routes/authRouter";
import { NextFunction, Request, Response } from "express";
import { protect } from "./middleware/auth";

process.loadEnvFile();

const PORT = process.env.PORT || 3000;

const app = express();

//la línea de abajo está permitiendo usar el cuerpo de la petición
app.use(express.json());
//cors permitiendo que el frontend haga uso del backend
app.use(cors());

// auth -> autorización
app.use("/api/auth", authRouter);

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Servidor HTTP en funcionamiento en el puerto ${PORT}`);
  connectDb();
});
