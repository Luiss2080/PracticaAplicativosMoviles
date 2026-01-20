import { FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MetodosPagoEstilos } from "../estilos/MetodosPagoEstilos";

const MOCK_TARJETAS = [
  { id: "1", numero: "•••• •••• •••• 4242", exp: "12/28", tipo: "cc-visa" },
  {
    id: "2",
    numero: "•••• •••• •••• 8888",
    exp: "09/26",
    tipo: "cc-mastercard",
  },
];

export default function MetodosPagoVista() {
  const router = useRouter();

  return (
    <View style={MetodosPagoEstilos.contenedor}>
      <LinearGradient
        colors={["#C21833", "#9f1239"]}
        style={MetodosPagoEstilos.encabezado}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 15 }}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={MetodosPagoEstilos.tituloEncabezado}>
            Métodos de Pago
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={MetodosPagoEstilos.lista}>
        {MOCK_TARJETAS.map((tarjeta) => (
          <View key={tarjeta.id} style={MetodosPagoEstilos.tarjeta}>
            <LinearGradient
              colors={["#1f2937", "#111827"]}
              style={MetodosPagoEstilos.fondoTarjeta}
            />
            <View style={MetodosPagoEstilos.filaTarjeta}>
              <FontAwesome5 name="sim-card" size={24} color="#d1d5db" />
              <FontAwesome5 name={tarjeta.tipo} size={30} color="#333" />
            </View>
            <Text style={MetodosPagoEstilos.numeroTarjeta}>
              {tarjeta.numero}
            </Text>
            <View style={MetodosPagoEstilos.infoTarjeta}>
              <View>
                <Text style={MetodosPagoEstilos.etiqueta}>Titular</Text>
                <Text style={MetodosPagoEstilos.valor}>JUAN PEREZ</Text>
              </View>
              <View>
                <Text style={MetodosPagoEstilos.etiqueta}>Expira</Text>
                <Text style={MetodosPagoEstilos.valor}>{tarjeta.exp}</Text>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={MetodosPagoEstilos.botonAgregar}
          activeOpacity={0.8}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
        >
          <FontAwesome5 name="plus-circle" size={24} color="#d1d5db" />
          <Text style={MetodosPagoEstilos.textoAgregar}>Agregar Tarjeta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
