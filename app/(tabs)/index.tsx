import { FontAwesome5 } from "@expo/vector-icons";
import { Stack } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, Usuario 👋</Text>
          <Text style={styles.subtitle}>Bienvenido a tu Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <FontAwesome5 name="bell" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={[styles.card, styles.cardBlue]}>
          <FontAwesome5 name="check-circle" size={24} color="#fff" />
          <Text style={styles.cardValue}>12</Text>
          <Text style={styles.cardLabel}>Tareas Listas</Text>
        </View>
        <View style={[styles.card, styles.cardOrange]}>
          <FontAwesome5 name="clock" size={24} color="#fff" />
          <Text style={styles.cardValue}>5</Text>
          <Text style={styles.cardLabel}>Pendientes</Text>
        </View>
      </View>

      {/* Actions Grid */}
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem}>
          <View style={[styles.iconContainer, { backgroundColor: "#e0f2fe" }]}>
            <FontAwesome5 name="plus" size={24} color="#0284c7" />
          </View>
          <Text style={styles.gridLabel}>Nuevo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <View style={[styles.iconContainer, { backgroundColor: "#dcfce7" }]}>
            <FontAwesome5 name="chart-bar" size={24} color="#16a34a" />
          </View>
          <Text style={styles.gridLabel}>Reportes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <View style={[styles.iconContainer, { backgroundColor: "#f3e8ff" }]}>
            <FontAwesome5 name="users" size={24} color="#9333ea" />
          </View>
          <Text style={styles.gridLabel}>Equipo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <View style={[styles.iconContainer, { backgroundColor: "#ffedd5" }]}>
            <FontAwesome5 name="cog" size={24} color="#ea580c" />
          </View>
          <Text style={styles.gridLabel}>Ajustes</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activity */}
      <Text style={styles.sectionTitle}>Actividad Reciente</Text>
      <View style={styles.list}>
        <View style={styles.listItem}>
          <FontAwesome5 name="file-alt" size={16} color="#666" />
          <Text style={styles.listText}>Reporte mensual generado</Text>
          <Text style={styles.listTime}>2h</Text>
        </View>
        <View style={styles.listItem}>
          <FontAwesome5 name="user-plus" size={16} color="#666" />
          <Text style={styles.listText}>Nuevo usuario registrado</Text>
          <Text style={styles.listTime}>5h</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
  },
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
  cardBlue: {
    backgroundColor: "#3b82f6",
  },
  cardOrange: {
    backgroundColor: "#f97316",
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  cardLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
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
  gridItem: {
    width: "25%",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    color: "#4b5563",
    fontWeight: "500",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  listText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 14,
    color: "#374151",
  },
  listTime: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
