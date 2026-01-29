import React, { createContext, useContext, useState } from "react";
import { ItemCarrito } from "../modelos/tipos";

type ContextoCarritoType = {
  items: ItemCarrito[];
  agregarItem: (item: ItemCarrito) => void;
  removerItem: (id: string) => void;
  actualizarCantidad: (id: string, cantidad: number) => void;
  total: number;
  limpiarCarrito: () => void;
  cantidadItems: number;
  metodoPago: string;
  setMetodoPago: (m: string) => void;
  notas: string;
  setNotas: (n: string) => void;
  direccionEntrega: any;
  setDireccionEntrega: (d: any) => void;
  tipoServicio: "delivery" | "retiro";
  setTipoServicio: (t: "delivery" | "retiro") => void;
  costoEnvio: number;
  cotizarEnvio: (
    restauranteId: number,
    direccionId: number,
    tipoServicio: string,
  ) => void;
};

const ContextoCarrito = createContext<ContextoCarritoType | undefined>(
  undefined,
);

export const CarritoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const [metodoPago, setMetodoPago] = useState("Efectivo");
  const [notas, setNotas] = useState("");
  const [direccionEntrega, setDireccionEntrega] = useState<any>(null);
  const [tipoServicio, setTipoServicio] = useState<"delivery" | "retiro">(
    "delivery",
  );
  const [costoEnvio, setCostoEnvio] = useState(2.0);

  // Placeholder for areOptionsEqual, assuming it compares two arrays of objects
  const areOptionsEqual = (
    opciones1: { id: string; cantidad: number }[] | undefined,
    opciones2: { id: string; cantidad: number }[] | undefined,
  ) => {
    if (!opciones1 && !opciones2) return true;
    if (!opciones1 || !opciones2) return false;
    if (opciones1.length !== opciones2.length) return false;

    const sortedOpciones1 = [...opciones1].sort((a, b) =>
      a.id.localeCompare(b.id),
    );
    const sortedOpciones2 = [...opciones2].sort((a, b) =>
      a.id.localeCompare(b.id),
    );

    for (let i = 0; i < sortedOpciones1.length; i++) {
      if (
        sortedOpciones1[i].id !== sortedOpciones2[i].id ||
        sortedOpciones1[i].cantidad !== sortedOpciones2[i].cantidad
      ) {
        return false;
      }
    }
    return true;
  };

  const cotizarEnvio = async (
    restauranteId: number,
    direccionId: number,
    tipoServicio: string,
  ) => {
    if (tipoServicio === "retiro") {
      setCostoEnvio(0);
      return;
    }
    try {
      // In real app use localhost/IP
      const res = await fetch("http://192.168.1.5:3000/api/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          restaurante_id: restauranteId,
          direccion_entrega_id: direccionId,
          tipo_vehiculo: "moto",
        }),
      });
      const data = await res.json();
      if (data.costo_envio) {
        setCostoEnvio(data.costo_envio);
      }
    } catch (e) {
      console.error("Error cotizando:", e);
      // Fallback
      setCostoEnvio(2.0);
    }
  };

  const agregarItem = (item: ItemCarrito) => {
    setItems((itemsActuales) => {
      const itemExistente = itemsActuales.find(
        (i) => i.id === item.id && areOptionsEqual(i.opciones, item.opciones),
      );

      if (itemExistente) {
        return itemsActuales.map((i) =>
          i.id === item.id && areOptionsEqual(i.opciones, item.opciones)
            ? { ...i, cantidad: i.cantidad + item.cantidad }
            : i,
        );
      }
      return [...itemsActuales, item];
    });
  };

  const removerItem = (id: string) => {
    setItems((itemsActuales) => itemsActuales.filter((i) => i.id !== id));
  };

  const actualizarCantidad = (id: string, cantidad: number) => {
    setItems((itemsActuales) => {
      if (cantidad <= 0) {
        return itemsActuales.filter((i) => i.id !== id);
      }
      return itemsActuales.map((i) => (i.id === id ? { ...i, cantidad } : i));
    });
  };

  const limpiarCarrito = () => {
    setItems([]);
    setNotas("");
  };

  const total = items.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  return (
    <ContextoCarrito.Provider
      value={{
        items,
        agregarItem,
        removerItem,
        actualizarCantidad,
        total,
        limpiarCarrito,
        cantidadItems: items.length,
        metodoPago,
        setMetodoPago,
        notas,
        setNotas,
        direccionEntrega,
        setDireccionEntrega,
        tipoServicio,
        setTipoServicio,
        costoEnvio,
        cotizarEnvio,
      }}
    >
      {children}
    </ContextoCarrito.Provider>
  );
};

export const useCarrito = () => {
  const context = useContext(ContextoCarrito);
  if (!context)
    throw new Error("useCarrito debe usarse dentro de CarritoProvider");
  return context;
};
