import { useEffect, useState } from "react";
import { Usuario } from "../modelos/tipos";
import { API_URL } from "../servicios/BaseDeDatos";
import { useAuthStore } from "../stores/useAuthStore";

export const usePerfilControlador = () => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: "Cargando...",
    email: "...",
    avatar: "user",
  });

  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.id) {
      fetchUsuario(user.id);
    }
  }, [user]);

  const fetchUsuario = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/api/usuarios/${id}`);
      const data = await res.json();
      if (data.id) {
        setUsuario(data);
      }
    } catch (e) {
      console.error(e);
    }
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
