import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isOtpValid, setIsOtpValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "otp") {
      if (/^\d{0,6}$/.test(value)) {
        // Asegura que solo haya números y máximo 6 caracteres
        setOtp(value);
        setIsOtpValid(value.length === 6);
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isOtp) {
        const response = await axios.post(
          "https://ej02.onrender.com/api/login",
          {
            email,
            token: otp,
          }
        );

        if (response.data.success) {
          localStorage.setItem("jwtToken", response.data.token);
          navigate("/inicio");
        } else {
          setError("OTP inválido. Inténtalo de nuevo.");
        }
      } else {
        const response = await axios.post(
          "https://ejs2-0bj8.onrender.com/api/login",
          {
            email,
            password,
          }
        );

        if (response.data.success) {
          localStorage.setItem("jwtToken", response.data.token);
          navigate("/inicio");
        } else {
          setError("Credenciales inválidas. Verifica tu email o contraseña.");
        }
      }
    } catch (err) {
      setError("Error al intentar iniciar sesión. Inténtalo de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-dark">
      <div className="container w-25">
        <form
          onSubmit={handleLoginSubmit}
          className="p-4 border rounded shadow-sm bg-white"
        >
          <h2 className="mb-4 text-center">Iniciar sesión</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          {isOtp ? (
            <div className="mb-3">
              <label className="form-label">Código OTP</label>
              <input
                type="text"
                name="otp"
                className="form-control"
                value={otp}
                onChange={handleChange}
                required
              />
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
          )}

          <div className="mb-3">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isOtp && !isOtpValid}
            >
              Iniciar sesión
            </button>
          </div>

          <div className="mb-3 text-center">
            <button
              type="button"
              onClick={() => setIsOtp(!isOtp)}
              className="btn btn-link"
            >
              {isOtp ? "Usar contraseña" : "Usar OTP"}
            </button>
          </div>

          <a href="/register" className="btn btn-link w-100 mt-2">
            ¿No tienes cuenta? Regístrate
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
