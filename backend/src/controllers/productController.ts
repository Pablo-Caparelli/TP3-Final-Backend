import { Request, Response } from "express";
import { Product } from "../models/productModel";

const getAllProducts = async (req: Request, res: Response): Promise<any> => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      data: products,
      message: "Obteniendo los productos",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
};

const getNameProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const name = req.params.name;
    const product = await Product.findOne({ name: name });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado",
      });
    }

    res.json({
      success: true,
      data: product,
      message: "Producto obtenido por nombre",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const addNewProduct = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const newProduct = new Product(body);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Producto creado con éxito",
      data: newProduct,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  const body = req.body;
  // VALIDACIONES DE INPUT - ZOD
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedProduct)
      return res.status(404).json({
        success: false,
        message: "producto no encontrado",
      });
    res.json({
      success: true,
      message: "producto actualizado con éxito",
      data: updatedProduct,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE eliminar usuario
const deleteProduct = async (req: Request, res: Response): Promise<any> => {
  const id = req.params.id;
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Producto no encontrado" });
    }
    res.json({
      success: true,
      data: deletedProduct,
      message: "Producto eliminado",
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: (error as Error).message });
  }
};

export {
  getAllProducts,
  getNameProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
