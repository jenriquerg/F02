import { useNavigate } from "react-router-dom";
import { IconLogout2 } from "@tabler/icons-react";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface UserData {
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
      <h1 className="text-center text-white">
        Bienvenido a la página de inicio
      </h1>
      <p className="text-center text-white">
        Bienvenido a la Plataforma de Gestión y Monitoreo de APIs
      </p>
      <p className="text-justify text-white">
        Esta aplicación permite gestionar y analizar el uso de dos servidores
        RESTful, diseñados para autenticar usuarios mediante JWT con
        autenticación multifactor (MFA), almacenar registros detallados de
        actividad (logs) y evaluar la seguridad y eficiencia del sistema.
      </p>
      <p className="text-justify text-white">
        <strong>Funciones principales:</strong>
      </p>
      <p className="text-justify text-white">
        Registro y autenticación segura con MFA, consulta de información sobre
        la versión del servidor y datos del usuario, registro detallado de logs
        con análisis gráfico, comparación entre un servidor con restricciones de
        seguridad (Rate Limit) y otro sin ellas. Puedes acceder al registro de
        actividad en la sección de Logs, donde se presentan gráficos
        comparativos entre los dos servidores.
      </p>
      {userData && (
        <div className="text-white text-center">
          {userData.grado && (
            <p>
              <strong>{userData.grado} </strong> {userData.username}
            </p>
          )}
          {userData.grupo && (
            <p>
              <strong>Grupo:</strong> {userData.grupo}
            </p>
          )}
        </div>
      )}
      <button className="btn btn-primary" onClick={goToLogs}>
        Ir a Logs
      </button>

      <div className="logo-container">
        <img src="../../public/vite.svg" alt="Vite Logo" className="logo" />
        <img src="../assets/react.svg" alt="React Logo" className="logo" />
      </div>

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
