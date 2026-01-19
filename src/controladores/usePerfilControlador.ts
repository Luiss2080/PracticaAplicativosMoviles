import { useState } from "react";
import { Usuario } from "../modelos/tipos";

export const usePerfilControlador = () => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);

  const usuario: Usuario = {
    nombre: "Usuario Demo",
    email: "usuario@ejemplo.com",
    avatar: "user-circle",
  };

  const cerrarSesion = () => {
    console.log("Cerrando sesión...");
    // Aquí iría la lógica real de logout
  };

  return {
    usuario,
    modoOscuro,
    setModoOscuro,
    notificaciones,
    setNotificaciones,
    cerrarSesion,
  };
};
