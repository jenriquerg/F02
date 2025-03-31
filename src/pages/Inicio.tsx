import { useNavigate } from "react-router-dom";
import { IconLogout2 } from "@tabler/icons-react";

const Inicio = () => {
  const navigate = useNavigate();

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
        Esta es la página de inicio de tu aplicación.
      </p>
      <a className="btn btn-primary" onClick={goToLogs}>
        {" "}
        Ir a Logs
      </a>

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
