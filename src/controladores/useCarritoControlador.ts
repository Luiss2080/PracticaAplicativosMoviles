import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { useCarrito } from "../context/ContextoCarrito";

export const useCarritoControlador = () => {
  const router = useRouter();
  const { items, total, removerItem, limpiarCarrito } = useCarrito();

  const procederAlPago = () => {
    if (items.length === 0) return;

    Alert.alert("Confirmar Pedido", "¿Deseas procesar tu pedido ahora?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Confirmar",
        onPress: () => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.push("/seguimiento/nuevo" as any);
        },
      },
    ]);
  };

  const vaciarCarrito = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      "Vaciar Carrito",
      "¿Estás seguro que deseas eliminar todos los productos?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, vaciar",
          style: "destructive",
          onPress: () => limpiarCarrito(),
        },
      ],
    );
  };

  const eliminarItem = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    removerItem(id);
  };

  const seguirComprando = () => {
    router.back();
  };

  const subtotal = total;
  const costoEnvio = 2.0;
  const totalPagar = subtotal + costoEnvio;

  return {
    items,
    subtotal,
    costoEnvio,
    totalPagar,
    eliminarItem,
    vaciarCarrito,
    procederAlPago,
    seguirComprando,
    router,
  };
};
