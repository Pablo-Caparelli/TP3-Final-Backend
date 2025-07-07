import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

process.loadEnvFile();

//analizar el token:
// 1 - para analizar de que existe
// 2 - para analizar si es válido (secretKey)
// 3 - para analizar si no está vencido (tiempo de expiración)

//let permiso = "test-del-token";

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const header = req.headers.authorization;
    const token = header?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "Token is required",
      });
    }

    // if (!token.endsWith("con-clave-secreta")) {
    //   return res.status(401).json({
    //     sucess: false,
    //     message: "Invalid token",
    //   });
    // }

    const secreyKey = process.env.JWT_SECRET!;

    //validar token
    const decode = jwt.verify(token, secreyKey);

    if (decode) {
      console.log("Podés pasar");
      next();
    }
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    if (err.message === "Invalid signature") {
      return res.status(500).json({
        success: false,
        message: "Invalid secret key",
      });
    }
    res.status(500).json({
      sucess: false,
      message: "Jsonwebtoken expired",
    });
  }
};

export { protect };

//dentro del token está validada la clase secreta
// de .env (JWT_SECRET)

//Bearer es un stándar
//es una práctica para indicar que el
// token es de tipo jwt
