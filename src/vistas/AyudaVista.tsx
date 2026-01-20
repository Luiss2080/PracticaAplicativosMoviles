import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AyudaEstilos } from "../estilos/AyudaEstilos";

const FAQ = [
  { PREGUNTA: "¿Cómo rastreo mi pedido?", ID: 1 },
  { PREGUNTA: "¿Puedo cancelar mi orden?", ID: 2 },
  { PREGUNTA: "Métodos de reembolso", ID: 3 },
];

export default function AyudaVista() {
  const router = useRouter();

  return (
    <View style={AyudaEstilos.contenedor}>
      <LinearGradient
        colors={["#C21833", "#9f1239"]}
        style={AyudaEstilos.encabezado}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 15 }}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={AyudaEstilos.tituloEncabezado}>Centro de Ayuda</Text>
            <Text style={AyudaEstilos.subtituloEncabezado}>
              Estamos aquí para ayudarte 24/7
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={AyudaEstilos.seccion}>
          <Text style={AyudaEstilos.tituloSeccion}>Preguntas Frecuentes</Text>
          {FAQ.map((faq) => (
            <TouchableOpacity key={faq.ID} style={AyudaEstilos.itemPregunta}>
              <Text style={AyudaEstilos.textoPregunta}>{faq.PREGUNTA}</Text>
              <FontAwesome5 name="chevron-right" size={14} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={AyudaEstilos.tituloSeccion}>Contáctanos</Text>

        <TouchableOpacity
          style={AyudaEstilos.botonContacto}
          onPress={() => Linking.openURL("tel:123456789")}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#ffe4e6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="phone-alt" size={18} color="#C21833" />
          </View>
          <Text style={AyudaEstilos.textoContacto}>Llámanos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={AyudaEstilos.botonContacto}
          onPress={() => Linking.openURL("mailto:soporte@delivery.com")}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#e0f2fe",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 name="envelope" size={18} color="#0284c7" />
          </View>
          <Text style={[AyudaEstilos.textoContacto, { color: "#0284c7" }]}>
            Envíanos un Email
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
