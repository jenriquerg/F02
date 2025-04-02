import { useNavigate } from "react-router-dom";
import { IconLogout2 } from "@tabler/icons-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface UserData {
  grado?: string;
  username?: string;
  grupo?: string;
}

const Inicio = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  useAuth(setUserData); // ✅ Esto ya maneja la autenticación y navegación

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
      {userData && (
        <div className="text-white text-justify p-3 w-75">
          {userData.grado && (
            <p>
              {userData.grado} {userData.username}
            </p>
          )}
          {userData.grupo && (
            <p>
              <strong>Grupo:</strong> {userData.grupo}
            </p>
          )}
        </div>
      )}
      <div className="text-justify text-white mb-4 p-3 w-75">
        <p>
          <strong>Bienvenido a la Plataforma de Gestión y Monitoreo de APIs</strong>
        </p>
        <p>
          Esta aplicación permite gestionar y analizar el uso de dos servidores
          RESTful, diseñados para autenticar usuarios mediante JWT con
          autenticación multifactor (MFA), almacenar registros detallados de
          actividad (logs) y evaluar la seguridad y eficiencia del sistema.
        </p>
        <p>
          <strong>Funciones principales:</strong>
        </p>
        <p>
          Registro y autenticación segura con MFA, consulta de información sobre
          la versión del servidor y datos del usuario, registro detallado de
          logs con análisis gráfico, comparación entre un servidor con
          restricciones de seguridad (Rate Limit) y otro sin ellas. Puedes
          acceder al registro de actividad en la sección de Logs, donde se
          presentan gráficos comparativos entre los dos servidores.
        </p>
      </div>
      <button className="btn btn-primary" onClick={goToLogs}>
        Ir a Logs
      </button>

      <div style={{ marginTop: "60px" }}>
        <img
          src="/vite.svg"
          alt="Vite Logo"
          style={{ marginRight: "20px", width: "100px" }}
        />
        <img
          src="/react.svg"
          alt="React Logo"
          style={{ marginRight: "20px", width: "100px" }}
        />
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
