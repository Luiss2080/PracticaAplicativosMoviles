import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDashboardControlador } from "../controladores/useDashboardControlador";

export default function DashboardVista() {
  const { estadisticas, acciones, actividades, saludo } =
    useDashboardControlador();

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{saludo}</Text>
          <Text style={styles.subtitle}>Bienvenido a tu Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <FontAwesome5 name="bell" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {estadisticas.map((stat) => (
          <View
            key={stat.id}
            style={[styles.card, { backgroundColor: stat.color }]}
          >
            <FontAwesome5 name={stat.icono} size={24} color="#fff" />
            <Text style={styles.cardValue}>{stat.valor}</Text>
            <Text style={styles.cardLabel}>{stat.titulo}</Text>
          </View>
        ))}
      </View>

      {/* Actions Grid */}
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.grid}>
        {acciones.map((accion) => (
          <TouchableOpacity key={accion.id} style={styles.gridItem}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: accion.colorFondo },
              ]}
            >
              <FontAwesome5
                name={accion.icono}
                size={24}
                color={accion.colorIcono}
              />
            </View>
            <Text style={styles.gridLabel}>{accion.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Actividad Reciente</Text>
      <View style={styles.list}>
        {actividades.map((act) => (
          <View key={act.id} style={styles.listItem}>
            <FontAwesome5 name={act.icono} size={16} color="#666" />
            <Text style={styles.listText}>{act.descripcion}</Text>
            <Text style={styles.listTime}>{act.tiempo}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 24, fontWeight: "bold", color: "#1f2937" },
  subtitle: { fontSize: 16, color: "#6b7280" },
  notificationBtn: {
    padding: 10,
    backgroundColor: "#f3f4f6",
    borderRadius: 50,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 25,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    justifyContent: "space-between",
    height: 120,
  },
  cardValue: { fontSize: 32, fontWeight: "bold", color: "#fff", marginTop: 10 },
  cardLabel: { fontSize: 14, color: "rgba(255,255,255,0.8)" },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginLeft: 20,
    marginBottom: 15,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  gridItem: { width: "25%", alignItems: "center", marginBottom: 10 },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridLabel: { fontSize: 12, color: "#4b5563", fontWeight: "500" },
  list: { paddingHorizontal: 20, paddingBottom: 40 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  listText: { flex: 1, marginLeft: 15, fontSize: 14, color: "#374151" },
  listTime: { fontSize: 12, color: "#9ca3af" },
});
