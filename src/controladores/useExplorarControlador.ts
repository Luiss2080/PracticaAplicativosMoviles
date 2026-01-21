import { useEffect, useState } from "react";
import { Recurso } from "../modelos/tipos";
import { getProductosTodos } from "../servicios/BaseDeDatos";

export const useExplorarControlador = () => {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [recursos, setRecursos] = useState<Recurso[]>([]);

  const categorias = [
    "Todos",
    "Hamburguesas",
    "Pizza",
    "Sushi",
    "Postres",
    "Bebidas",
  ];

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const productos = await getProductosTodos();
      // Mappear producto DB a la interfaz visual Recurso
      const items = productos.map((p: any) => ({
        id: p.id.toString(),
        titulo: p.nombre,
        descripcion: `${p.descripcion} • $${p.precio.toFixed(2)}`,
        categoria: p.categoria || "Varios",
        imagen: p.imagen,
      }));
      setRecursos(items);
    } catch (e) {
      console.error("Error cargando productos", e);
    }
  };

  const recursosFiltrados = recursos.filter((r) => {
    const coincideBusqueda =
      r.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaActiva === "Todos" || r.categoria === categoriaActiva;

    return coincideBusqueda && coincideCategoria;
  });

  return {
    busqueda,
    setBusqueda,
    recursosFiltrados,
    categoriaActiva,
    setCategoriaActiva,
    categorias,
  };
};
