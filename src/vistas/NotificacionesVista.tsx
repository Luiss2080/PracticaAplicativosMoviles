import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { NotificacionesEstilos } from "../estilos/NotificacionesEstilos";

const MOCK_NOTIFICACIONES = [
  {
    id: 1,
    titulo: "¡Tu pedido está en camino!",
    mensaje: "El repartidor ha recogido tu orden y está cerca.",
    tiempo: "Hace 5 min",
    icono: "motorcycle",
    color: "#C21833",
  },
  {
    id: 2,
    titulo: "50% Descuento en Pizzas",
    mensaje: "Solo por hoy aprovecha nuestra promoción exclusiva.",
    tiempo: "Hace 2 horas",
    icono: "tag",
    color: "#eab308",
  },
  {
    id: 3,
    titulo: "Pedido Entregado",
    mensaje: "Disfruta tu comida. ¡Gracias por preferirnos!",
    tiempo: "Ayer",
    icono: "check-circle",
    color: "#22c55e",
  },
];

export default function NotificacionesVista() {
  const router = useRouter();

  return (
    <View style={NotificacionesEstilos.contenedor}>
      <LinearGradient
        colors={["#C21833", "#9f1239"]}
        style={NotificacionesEstilos.encabezado}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 15 }}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={NotificacionesEstilos.tituloEncabezado}>
            Notificaciones
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={NotificacionesEstilos.lista}>
        {MOCK_NOTIFICACIONES.map((noti) => (
          <View key={noti.id} style={NotificacionesEstilos.item}>
            <View
              style={[
                NotificacionesEstilos.iconoContenedor,
                { backgroundColor: noti.color + "20" },
              ]}
            >
              <FontAwesome5 name={noti.icono} size={20} color={noti.color} />
            </View>
            <View style={NotificacionesEstilos.contenido}>
              <Text style={NotificacionesEstilos.tituloNotificacion}>
                {noti.titulo}
              </Text>
              <Text style={NotificacionesEstilos.textoNotificacion}>
                {noti.mensaje}
              </Text>
              <Text style={NotificacionesEstilos.tiempo}>{noti.tiempo}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
