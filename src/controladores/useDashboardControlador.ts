import { Accion, Actividad, Estadistica } from "../modelos/tipos";

export const useDashboardControlador = () => {
  const estadisticas: Estadistica[] = [
    {
      id: "1",
      titulo: "Tareas Listas",
      valor: "12",
      icono: "check-circle",
      color: "#3b82f6",
    },
    {
      id: "2",
      titulo: "Pendientes",
      valor: "5",
      icono: "clock",
      color: "#f97316",
    },
  ];

  const acciones: Accion[] = [
    {
      id: "1",
      titulo: "Nuevo",
      icono: "plus",
      colorFondo: "#e0f2fe",
      colorIcono: "#0284c7",
    },
    {
      id: "2",
      titulo: "Reportes",
      icono: "chart-bar",
      colorFondo: "#dcfce7",
      colorIcono: "#16a34a",
    },
    {
      id: "3",
      titulo: "Equipo",
      icono: "users",
      colorFondo: "#f3e8ff",
      colorIcono: "#9333ea",
    },
    {
      id: "4",
      titulo: "Ajustes",
      icono: "cog",
      colorFondo: "#ffedd5",
      colorIcono: "#ea580c",
    },
  ];

  const actividades: Actividad[] = [
    {
      id: "1",
      descripcion: "Reporte mensual generado",
      tiempo: "2h",
      icono: "file-alt",
    },
    {
      id: "2",
      descripcion: "Nuevo usuario registrado",
      tiempo: "5h",
      icono: "user-plus",
    },
  ];

  const saludo = "Hola, Usuario 👋";

  return {
    estadisticas,
    acciones,
    actividades,
    saludo,
  };
};
