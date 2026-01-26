import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getPedidosUsuario } from "../../servicios/BaseDeDatos";
import { useAuthStore } from "../../stores/useAuthStore";

export default function HistorialPedidosVista() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPedidos();
    }
  }, [user]);

  const loadPedidos = async () => {
    setLoading(true);
    // Ensure user.id is passed correctly (assuming user object has id)
    const data = await getPedidosUsuario(user?.id || 1);
    setPedidos(data);
    setLoading(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.imagen_restaurante || "https://via.placeholder.com/50",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.restName}>
            {item.nombre_restaurante || "Restaurante"}
          </Text>
          <Text style={styles.total}>${parseFloat(item.total).toFixed(2)}</Text>
        </View>
        <Text style={styles.items}>
          {item.fecha_creacion
            ? new Date(item.fecha_creacion).toLocaleDateString()
            : "Fecha desc."}
        </Text>
        <View style={styles.row}>
          <View
            style={[
              styles.statusBadge,
              item.estado === "cancelado"
                ? styles.statusRed
                : styles.statusGreen,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.estado === "cancelado" ? styles.textRed : styles.textGreen,
              ]}
            >
              {item.estado ? item.estado.toUpperCase() : "PENDIENTE"}
            </Text>
          </View>
          <TouchableOpacity style={styles.reorderBtn}>
            <Text style={styles.reorderText}>Reordenar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Pedidos</Text>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#EA052C" />
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Text style={{ color: "#94A3B8" }}>
                No tienes pedidos recientes.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#1E293B" },
  list: { padding: 20 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: "#F8FAFC",
  },
  info: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restName: { fontSize: 16, fontWeight: "bold", color: "#1E293B" },
  total: { fontWeight: "bold", color: "#1E293B" },
  items: { color: "#64748B", fontSize: 13, marginVertical: 5 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  statusGreen: { backgroundColor: "#DCFCE7" },
  statusRed: { backgroundColor: "#FEE2E2" },
  statusText: { fontSize: 11, fontWeight: "bold" },
  textGreen: { color: "#166534" },
  textRed: { color: "#991B1B" },
  reorderBtn: { paddingVertical: 5, paddingHorizontal: 12 },
  reorderText: { color: "#EA052C", fontWeight: "bold", fontSize: 14 },
});
