import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav>
          {!user && (
            <ul>
              <li>
                <Link to="/" state={{ reload: true }}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Registro</Link>
              </li>
            </ul>
          )}
          {user && (
            <>
              <ul>
                <li>
                  <Link to="/" state={{ reload: true }}>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <button onClick={handleClick}>Cerrar sesión</button>
              </ul>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
      <footer>&copy; 2025 Sitio Desarrollado por Pablo Caparelli.</footer>
    </>
  );
};

export { Layout };
