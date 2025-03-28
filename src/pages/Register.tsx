import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    grado: "",
    grupo: "",
  });
  const [qrCode, setQrCode] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      console.log(formData);
      const response = await axios.post(
        "https://ej02.onrender.com/api/register",
        formData
      );
      setQrCode(response.data.secret);
      setStep(2);
    } catch (err) {
      setError(
        "Error en el registro. Verifica los datos e inténtalo de nuevo."
      );
      console.error(err);
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    try {
      const response = await axios.post("https://ej02.onrender.com/api/login", {
        email: formData.email,
        token: otp,
      });
      setJwtToken(response.data.token);
      setStep(4);
      localStorage.setItem("jwtToken", response.data.token);
      navigate("/inicio");
    } catch (err) {
      setError("OTP inválido. Inténtalo de nuevo.");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-dark">
      <div className="container w-25">
        {step === 1 && (
          <form
            onSubmit={handleSubmit}
            className="p-4 border rounded shadow-sm bg-white"
          >
            <h2 className="mb-4 text-center">Registro</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Grado</label>
              <select
                className="form-select"
                name="grado"
                value={formData.grado}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccione un grado
                </option>
                <option value="Ing.">Ingeniero/a</option>
                <option value="T.S.U.">Técnico Superior Universitario</option>
                <option value="Prof.">Profesor/a</option>
                <option value="Lic.">Licenciado/a</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Grupo</label>
              <input
                type="text"
                name="grupo"
                className="form-control"
                value={formData.grupo}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Registrarse
            </button>
            <a href="/login" className="btn btn-link w-100">
              Ya tengo una cuenta, quiero iniciar sesión
            </a>
          </form>
        )}

        {step === 2 && (
          <div className="text-center p-4 border rounded shadow-sm bg-white">
            <h2 className="mb-4">Escanea este código QR</h2>
            <QRCodeCanvas value={qrCode} size={200} />
            <p className="mt-3">
              Usa una aplicación como Google Authenticator o Authy para escanear
              el código.
            </p>
            <button onClick={() => setStep(3)} className="btn btn-primary mt-3">
              Verificar OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center p-4 border rounded shadow-sm bg-white">
            <h2 className="mb-4">Verificar OTP</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="text"
              className="form-control mb-3 text-center"
              placeholder="Ingrese el código OTP"
              value={otp}
              onChange={handleOtpChange}
              required
            />
            <button onClick={handleVerifyOtp} className="btn btn-success w-100">
              Validar OTP
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="text-center p-4 border rounded shadow-sm bg-white">
            <h2 className="mb-4">¡Registro completado!</h2>
            <p className="mt-3">Tu autenticación fue exitosa.</p>
            <p>
              <strong>Token JWT:</strong> {jwtToken}
            </p>
            <a href="/" className="btn btn-primary w-100">
              Ir al inicio
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
