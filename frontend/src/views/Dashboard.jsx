import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { createProduct, updateProduct } from "../services/product";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productToEdit = location.state?.productToEdit || null;
  const isEditMode = Boolean(productToEdit);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("sin categoria");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (isEditMode && productToEdit) {
      setName(productToEdit.name || "");
      setPrice(productToEdit.price || 0);
      setCategory(productToEdit.category || "sin categoria");
    }
  }, [isEditMode, productToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!name || !price || category === "sin categoria") {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      let response;

      if (isEditMode) {
        response = await updateProduct(productToEdit._id, {
          name,
          price,
          category,
        });
      } else {
        response = await createProduct({ name, price, category });
      }

      if (!response.ok) {
        setError("Error al guardar el producto.");
        return;
      }

      const serverRes = await response.json();

      setMessage(
        isEditMode
          ? "✅ Producto actualizado con éxito"
          : "✅ Producto creado con éxito ID: " + serverRes.data._id
      );

      if (isEditMode) {
        alert(`✅ Producto actualizado con éxito:
        Nombre: ${name}
        Precio: ${price}
        Categoría: ${category}`);
      } else {
        alert(`✅ Producto creado con éxito:
        Nombre: ${name}
        Precio: ${price}
        Categoría: ${category}`);

        setName("");
        setPrice(0);
        setCategory("sin categoria");
      }
    } catch (error) {
      console.error(error);
      setError("Ocurrió un error inesperado.");
    }
  };

  return (
    <Layout>
      <h1>Panel de administración</h1>
      <h2>{isEditMode ? "Editar producto" : "Agregar nuevo producto"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre del producto:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="price">Precio del producto:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label htmlFor="category">Categoría del producto:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="sin categoria">Sin categoría</option>
          <option value="almacen">Almacén</option>
          <option value="limpieza">Limpieza</option>
        </select>

        <button className="agregar">
          {isEditMode ? "Actualizar producto" : "Agregar producto"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </Layout>
  );
};

export { Dashboard };
