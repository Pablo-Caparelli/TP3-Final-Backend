import { Router } from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController";

const productRouter = Router();

// Manejar las peticiones para los productos
productRouter.get("/", getAllProducts);
productRouter.post("/", addNewProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export { productRouter };
