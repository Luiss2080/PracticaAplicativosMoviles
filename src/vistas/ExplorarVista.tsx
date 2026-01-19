import { FontAwesome5 } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useExplorarControlador } from "../controladores/useExplorarControlador";

export default function ExplorarVista() {
  const { busqueda, setBusqueda, recursosFiltrados } = useExplorarControlador();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.title}>Explorar</Text>
        <View style={styles.searchContainer}>
          <FontAwesome5
            name="search"
            size={16}
            color="#9ca3af"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cursos, artículos..."
            placeholderTextColor="#9ca3af"
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>
      </View>

      <FlatList
        data={recursosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/detalle/${item.id}`)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.categoria}</Text>
              </View>
            </View>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardDesc} numberOfLines={2}>
              {item.descripcion}
            </Text>

            <View style={styles.cardFooter}>
              <Text style={styles.linkText}>Ver más</Text>
              <FontAwesome5 name="arrow-right" size={12} color="#3b82f6" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#111", marginBottom: 15 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: "#333" },
  list: { padding: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  badge: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: "#3b82f6", fontSize: 12, fontWeight: "600" },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 15,
    lineHeight: 20,
  },
  cardFooter: { flexDirection: "row", alignItems: "center" },
  linkText: {
    color: "#3b82f6",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 5,
  },
});
