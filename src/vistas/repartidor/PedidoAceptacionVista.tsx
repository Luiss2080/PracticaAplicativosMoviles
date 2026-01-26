import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PedidoAceptacionVista() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [aceptando, setAceptando] = useState(false);

  // Mock Data (In real app, fetch from ID)
  const pedido = {
    id: params.id || "#12345",
    restaurante: "Burger King",
    direccion_restaurante: "Av. Libertador 123",
    cliente: "Juan Pérez",
    direccion_cliente: "Calle 10, Nro 45",
    total: 15.5,
    ganancia: 3.5,
    distancia: "2.5 km",
    items: 3,
  };

  const handleAceptar = () => {
    Alert.alert("Aceptar Pedido", "¿Estás seguro de aceptar este pedido?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Aceptar",
        onPress: () => {
          setAceptando(true);
          setTimeout(() => {
            router.replace("/repartidor/entrega"); // Navigate to active delivery
          }, 1000);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -17.393835,
            longitude: -66.156946,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: -17.393835, longitude: -66.156946 }}
            title="Restaurante"
            pinColor="red"
          />
          <Marker
            coordinate={{ latitude: -17.396835, longitude: -66.154946 }}
            title="Cliente"
            pinColor="blue"
          />
        </MapView>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.handleBar} />

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.gananciaLabel}>Ganancia estimada</Text>
            <Text style={styles.gananciaValue}>
              ${pedido.ganancia.toFixed(2)}
            </Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <FontAwesome5 name="road" size={14} color="#6B7280" />
              <Text style={styles.statText}>{pedido.distancia}</Text>
            </View>
            <View style={styles.statItem}>
              <FontAwesome5 name="shopping-bag" size={14} color="#6B7280" />
              <Text style={styles.statText}>{pedido.items} items</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.routeStep}>
          <View style={[styles.dot, { backgroundColor: "#EF4444" }]} />
          <View style={styles.routeContent}>
            <Text style={styles.stepTitle}>{pedido.restaurante}</Text>
            <Text style={styles.stepSubtitle}>
              {pedido.direccion_restaurante}
            </Text>
          </View>
        </View>

        <View style={styles.routeConnector} />

        <View style={styles.routeStep}>
          <View style={[styles.dot, { backgroundColor: "#3B82F6" }]} />
          <View style={styles.routeContent}>
            <Text style={styles.stepTitle}>Entrega a {pedido.cliente}</Text>
            <Text style={styles.stepSubtitle}>{pedido.direccion_cliente}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAceptar}
          disabled={aceptando}
        >
          <LinearGradient
            colors={["#10B981", "#059669"]}
            style={styles.gradientBtn}
          >
            {aceptando ? (
              <Text style={styles.btnText}>Asignando...</Text>
            ) : (
              <Text style={styles.btnText}>Aceptar Pedido</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { flex: 1 },
  map: { width: "100%", height: "100%" },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    elevation: 5,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    marginTop: -20,
    shadowColor: "#000",
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.1,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  gananciaLabel: { color: "#6B7280", fontSize: 14 },
  gananciaValue: { color: "#10B981", fontSize: 24, fontWeight: "bold" },
  statsRow: { flexDirection: "row", gap: 15 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  statText: { color: "#374151", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 15 },
  routeStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  dot: { width: 12, height: 12, borderRadius: 6, marginTop: 5 },
  routeContent: { marginLeft: 15 },
  stepTitle: { fontSize: 16, fontWeight: "bold", color: "#1F2937" },
  stepSubtitle: { color: "#6B7280", marginTop: 2 },
  routeConnector: {
    width: 2,
    height: 30,
    backgroundColor: "#E5E7EB",
    marginLeft: 5,
    marginVertical: -5,
  },
  acceptButton: { marginTop: 25 },
  gradientBtn: { padding: 18, borderRadius: 15, alignItems: "center" },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
