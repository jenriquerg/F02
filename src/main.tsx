import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Inicio from "./pages/Inicio";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import PrivateRoute from "./PrivateRoute";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/inicio" element={<Inicio />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("No se encontró el elemento root en el DOM");
}
