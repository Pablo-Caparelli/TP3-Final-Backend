import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { getProducts, deleteProduct } from "../services/product";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await getProducts();
    const responseToJson = await response.json();

    if (response.ok) {
      setProducts(responseToJson.data);
      setFilteredProducts(responseToJson.data);
    }
  };

  const handleClick = async (product) => {
    if (confirm("¿Estás seguro que quieres borrar el producto?")) {
      const response = await deleteProduct(product._id);
      if (!response.ok) {
        alert("Error al borrar producto.");
      } else {
        alert(`🗑️ El Producto fue borrado con éxito:
        Nombre: ${product.name}
        Precio: ${product.price}
        Categoría: ${product.category}`);
        fetchProducts();
      }
    }
  };

  const handleUpdate = (product) => {
    navigate("/dashboard", { state: { productToEdit: product } });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (location.state?.reload) {
      fetchProducts();
    }
  }, [location.state]);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:1234/api/products/name/${searchInput}`
      );
      const result = await response.json();

      if (!response.ok) {
        setFilteredProducts([]);
      } else {
        setFilteredProducts(result.data);
      }

      setSearchInput("");
    } catch (error) {
      console.error("Error al buscar productos:", error);
      setFilteredProducts([]);
    }
  };

  const handleInicio = () => {
    fetchProducts();
  };

  return (
    <Layout onInicioClick={handleInicio}>
      <h1>Bienvenido a nuestra tienda de productos artesanales</h1>
      <p>
        Descubrí nuestra selección exclusiva de productos únicos hechos a mano.
        Calidad y diseño en cada detalle.
      </p>

      <div className="search">
        <label className="search-label" htmlFor="search">
          Buscar por nombre:
        </label>
        <input
          id="search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          placeholder="Ingrese nombre del producto"
        />
        <button className="search-button" onClick={handleSearch}>
          Buscar y limpiar input
        </button>
      </div>

      <section>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id}>
              <p>
                <b>Nombre:</b> {product.name}
              </p>
              <p>
                <b>Precio:</b> {product.price}
              </p>
              <p>
                <b>Categoria:</b> {product.category}
              </p>
              {user && (
                <div className="botones">
                  <div className="cont-button-delete">
                    <button onClick={() => handleClick(product)}>Borrar</button>
                  </div>
                  <div className="cont-button-update">
                    <button onClick={() => handleUpdate(product)}>
                      Actualizar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No se encontraron los productos buscados.</p>
        )}
      </section>
    </Layout>
  );
};

export { Home };
