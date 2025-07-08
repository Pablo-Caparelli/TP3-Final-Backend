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

  // const handleUpdate = async (product) => {
  //   navigate("/dashboard", { state: { productToEdit: product } });
  //   if (!response.ok) {
  //     alert("Error al actualizar el producto.");
  //   } else {
  //     alert(`🗑️ El Producto fue actualizado con éxito:
  //       Nombre: ${product.name}
  //       Precio: ${product.price}
  //       Categoría: ${product.category}`);
  //     fetchProducts();
  //   }
  // };

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

  const handleSearch = () => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
    setSearchInput(""); // limpia el input después de filtrar
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
