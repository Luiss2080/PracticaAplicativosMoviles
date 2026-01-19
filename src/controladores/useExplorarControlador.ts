import { useState } from "react";
import { Recurso } from "../modelos/tipos";

export const useExplorarControlador = () => {
  const [busqueda, setBusqueda] = useState("");

  // Mock Data
  const recursosIniciales: Recurso[] = [
    {
      id: "1",
      titulo: "Introducción a React Native",
      descripcion: "Aprende los fundamentos de RN.",
      categoria: "Curso",
      imagen: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "2",
      titulo: "Diseño UI Avanzado",
      descripcion: "Mejora tus interfaces móviles.",
      categoria: "Diseño",
      imagen: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "3",
      titulo: "Gestión de Estado",
      descripcion: "Redux, Context API y más.",
      categoria: "Desarrollo",
      imagen: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "4",
      titulo: "Animaciones Fluidas",
      descripcion: "Crea experiencias interactivas.",
      categoria: "Animación",
      imagen: "https://reactnative.dev/img/tiny_logo.png",
    },
    {
      id: "5",
      titulo: "Despliegue en Stores",
      descripcion: "Guía para Play Store y App Store.",
      categoria: "DevOps",
      imagen: "https://reactnative.dev/img/tiny_logo.png",
    },
  ];

  const recursosFiltrados = recursosIniciales.filter((r) =>
    r.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return {
    busqueda,
    setBusqueda,
    recursosFiltrados,
  };
};
