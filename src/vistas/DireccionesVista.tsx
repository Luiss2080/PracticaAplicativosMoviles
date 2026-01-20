import { FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DireccionesEstilos } from "../estilos/DireccionesEstilos";

const MOCK_DIRECCIONES = [
  {
    id: "1",
    nombre: "Casa",
    direccion: "Av. Larco 123, Miraflores",
    icono: "home",
  },
  {
    id: "2",
    nombre: "Oficina",
    direccion: "Calle Las Begonias 450, San Isidro",
    icono: "briefcase",
  },
];

export default function DireccionesVista() {
  const router = useRouter();

  return (
    <View style={DireccionesEstilos.contenedor}>
      <LinearGradient
        colors={["#C21833", "#9f1239"]}
        style={DireccionesEstilos.encabezado}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 15 }}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={DireccionesEstilos.tituloEncabezado}>
            Mis Direcciones
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={DireccionesEstilos.lista}>
        {MOCK_DIRECCIONES.map((dir) => (
          <TouchableOpacity
            key={dir.id}
            style={DireccionesEstilos.tarjeta}
            activeOpacity={0.7}
            onPress={() => Haptics.selectionAsync()}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <View style={DireccionesEstilos.iconoDireccion}>
                <FontAwesome5 name={dir.icono} size={18} color="#C21833" />
              </View>
              <View style={DireccionesEstilos.infoDireccion}>
                <Text style={DireccionesEstilos.tituloDireccion}>
                  {dir.nombre}
                </Text>
                <Text style={DireccionesEstilos.textoDireccion}>
                  {dir.direccion}
                </Text>
              </View>
            </View>
            <FontAwesome5 name="pen" size={14} color="#9ca3af" />
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={DireccionesEstilos.botonAgregar}
          activeOpacity={0.8}
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        >
          <FontAwesome5 name="plus" size={16} color="#fff" />
          <Text style={DireccionesEstilos.textoBoton}>
            Agregar Nueva Dirección
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
