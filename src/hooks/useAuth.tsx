import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface UserData {
  grado?: string;
  username?: string;
  grupo?: string;
  exp?: number; // Agregamos el campo exp para validar expiración
}

export const useAuth = (setUserData?: (data: UserData | null) => void) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode<UserData>(token);

      // Verificar si el token ha expirado
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        console.warn("Token expirado. Redirigiendo a /login...");
        localStorage.removeItem("jwtToken");
        navigate("/login");
        return;
      }

      if (setUserData) setUserData(decoded);
    } catch (error) {
      console.error("Error al decodificar el token", error);
      localStorage.removeItem("jwtToken");
      navigate("/login");
    }
  }, [navigate, setUserData]);
};