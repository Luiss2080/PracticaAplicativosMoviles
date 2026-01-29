import React, { createContext, useContext, useEffect, useState } from "react";
import { Producto } from "../modelos/tipos";

type FavoritoItem = {
  id: string;
  nombre: string;
  imagen: string;
  rating: number; // Storing minimal info for the list
  precio: number;
};

type ContextoFavoritosType = {
  favoritos: FavoritoItem[];
  toggleFavorito: (producto: Producto) => void;
  esFavorito: (id: string) => boolean;
};

const ContextoFavoritos = createContext<ContextoFavoritosType | undefined>(
  undefined,
);

export const FavoritosProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favoritos, setFavoritos] = useState<FavoritoItem[]>([]);
  // Hardcoded user ID for demo
  const USUARIO_ID = 1;

  useEffect(() => {
    fetchFavoritos();
  }, []);

  const fetchFavoritos = async () => {
    try {
      // Use API_URL from BaseDeDatos if imported, or relative if proxy.
      // For now assuming we need full URL or utilizing same pattern as others.
      // Let's use hardcoded IP or improved API_URL import if possible.
      // To be safe I'll use the IP directly as in other files if I can't import easily,
      // or better: Import API_URL.
      const res = await fetch(`${API_URL}/favoritos/${USUARIO_ID}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setFavoritos(
          data.map((p: any) => ({
            id: p.id,
            nombre: p.nombre,
            imagen: p.imagen,
            precio: p.precio,
            rating: 4.5,
          })),
        );
      }
    } catch (e) {
      console.error("Error fetching favoritos", e);
    }
  };

    if (!user) return; // Guard clause
    const esFav = favoritos.some((fav) => fav.id === producto.id);

    // Optimistic Update
    if (esFav) {
      setFavoritos((prev) => prev.filter((f) => f.id !== producto.id));
      try {
        await fetch(`${API_URL}/api/favoritos`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: user.id,
            producto_id: producto.id,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      const newFav = {
        id: producto.id,
        nombre: producto.nombre,
        imagen: producto.imagen,
        rating: 4.5,
        precio: producto.precio,
      };
      setFavoritos((prev) => [...prev, newFav]);
      try {
        await fetch(`${API_URL}/api/favoritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario_id: user.id,
            producto_id: producto.id,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const esFavorito = (id: string) => {
    return favoritos.some((fav) => fav.id === id);
  };

  return (
    <ContextoFavoritos.Provider
      value={{ favoritos, toggleFavorito, esFavorito }}
    >
      {children}
    </ContextoFavoritos.Provider>
  );
};

export const useFavoritos = () => {
  const context = useContext(ContextoFavoritos);
  if (!context)
    throw new Error("useFavoritos debe usarse dentro de FavoritosProvider");
  return context;
};
