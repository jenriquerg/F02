import { useNavigate } from "react-router-dom";
import { IconLogout2 } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface UserData {
  email?: string;
  grado?: string;
  username?: string;
  grupo?: string;
}

const Inicio = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      try {
        const decoded = jwtDecode<UserData>(token);
        setUserData(decoded);
      } catch (error) {
        console.error("Error al decodificar el token", error);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const goToLogs = () => {
    navigate("/logs");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 vw-100 bg-dark">
      <h1 className="text-center text-white">Bienvenido a la página de inicio</h1>
      <p className="text-center text-white">Esta es la página de inicio de tu aplicación.</p>
      {userData && (
        <div className="text-white text-center">
          {userData.username && <p><strong>Usuario:</strong> {userData.username}</p>}
          {userData.email && <p><strong>Correo:</strong> {userData.email}</p>}
          {userData.grado && <p><strong>Grado:</strong> {userData.grado}</p>}
          {userData.grupo && <p><strong>Grupo:</strong> {userData.grupo}</p>}
        </div>
      )}
      <button className="btn btn-primary" onClick={goToLogs}>Ir a Logs</button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          zIndex: 1000,
        }}
      >
        <button onClick={handleLogout} className="btn btn-danger">
          <IconLogout2 style={{ color: "white" }} stroke={2} />
        </button>
      </div>
    </div>
  );
};

export default Inicio;