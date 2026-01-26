import { FontAwesome5 } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const STATES = ["Recogiendo", "En Camino", "Entregado"];

export default function EntregaActivaVista() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // Mock Active Order
  const order = {
    id: "#12345",
    restaurant: { name: "Burger King", lat: -17.393835, long: -66.156946 },
    customer: {
      name: "Juan Pérez",
      lat: -17.396835,
      long: -66.154946,
      phone: "77712345",
    },
  };

  const handleNextStep = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (step < 2) {
      setStep(step + 1);
    } else {
      // Complete
      Alert.alert("¡Excelente!", "Has completado el pedido.", [
        {
          text: "Volver al Inicio",
          onPress: () => router.replace("/repartidor/home"),
        },
      ]);
    }
  };

  const openMaps = () => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${order.customer.lat},${order.customer.long}`;
    const label = "Cliente";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    if (url) Linking.openURL(url);
  };

  const callCustomer = () => {
    Linking.openURL(`tel:${order.customer.phone}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {/* Map Header */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -17.395, // Center roughly
            longitude: -66.155,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
        >
          <Marker
            coordinate={{
              latitude: order.restaurant.lat,
              longitude: order.restaurant.long,
            }}
            title="Restaurante"
          >
            <View style={styles.markerRest}>
              <FontAwesome5 name="utensils" size={15} color="#fff" />
            </View>
          </Marker>
          <Marker
            coordinate={{
              latitude: order.customer.lat,
              longitude: order.customer.long,
            }}
            title="Cliente"
          >
            <View style={styles.markerClient}>
              <FontAwesome5 name="user" size={15} color="#fff" />
            </View>
          </Marker>
          <Polyline
            coordinates={[
              {
                latitude: order.restaurant.lat,
                longitude: order.restaurant.long,
              },
              { latitude: order.customer.lat, longitude: order.customer.long },
            ]}
            strokeColor="#3B82F6"
            strokeWidth={4}
            lineDashPattern={[1]}
          />
        </MapView>

        <View style={styles.topOverlay}>
          <View style={styles.statusBadge}>
            <View style={styles.pulse} />
            <Text style={styles.statusText}>{STATES[step]}</Text>
          </View>
        </View>
      </View>

      {/* Floating Action Card */}
      <View style={styles.panel}>
        <View style={styles.customerRow}>
          <View>
            <Text style={styles.customerLabel}>Cliente</Text>
            <Text style={styles.customerName}>{order.customer.name}</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.iconBtn} onPress={callCustomer}>
              <FontAwesome5 name="phone" size={20} color="#10B981" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={openMaps}>
              <FontAwesome5 name="directions" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.stepsContainer}>
          {STATES.map((s, idx) => (
            <View
              key={idx}
              style={[
                styles.stepItem,
                idx <= step ? styles.stepActive : styles.stepInactive,
              ]}
            >
              <View style={styles.stepDot}>
                {idx < step ? (
                  <FontAwesome5 name="check" size={10} color="#fff" />
                ) : (
                  <Text style={styles.stepNum}>{idx + 1}</Text>
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  idx === step && styles.stepLabelActive,
                ]}
              >
                {s}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.mainBtn,
            step === 2 ? styles.btnFinish : styles.btnAction,
          ]}
          onPress={handleNextStep}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>
            {step === 0
              ? "Confirmar Recogida"
              : step === 1
                ? "Confirmar Entrega"
                : "Finalizar"}
          </Text>
          <FontAwesome5
            name={step === 2 ? "check-circle" : "arrow-right"}
            size={18}
            color="#fff"
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { flex: 1 },
  map: { width: "100%", height: "110%" },
  topOverlay: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  statusBadge: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    elevation: 5,
  },
  pulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 8,
  },
  statusText: { color: "#fff", fontWeight: "bold" },
  markerRest: {
    backgroundColor: "#EF4444",
    padding: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerClient: {
    backgroundColor: "#3B82F6",
    padding: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },

  panel: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    marginTop: -30,
    shadowColor: "#000",
    shadowOffset: { height: -5, width: 0 },
    shadowOpacity: 0.1,
    elevation: 15,
  },
  customerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  customerLabel: {
    color: "#64748B",
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  customerName: { fontSize: 20, fontWeight: "bold", color: "#1E293B" },
  actions: { flexDirection: "row", gap: 15 },
  iconBtn: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginBottom: 20 },
  stepsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  stepItem: { alignItems: "center", flex: 1 },
  stepActive: { opacity: 1 },
  stepInactive: { opacity: 0.4 },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  stepNum: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  stepLabel: { fontSize: 10, color: "#64748B" },
  stepLabelActive: { color: "#1E293B", fontWeight: "bold" },

  mainBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 16,
  },
  btnAction: { backgroundColor: "#3B82F6" },
  btnFinish: { backgroundColor: "#10B981" },
  btnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
