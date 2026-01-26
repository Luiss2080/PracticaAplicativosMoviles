import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock Data
const PAST_ORDERS = [
  {
    id: "12345",
    rest: "Burger King",
    date: "26 Ene, 14:30",
    total: 15.5,
    items: "Whopper combo x1",
    status: "Entregado",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png",
  },
  {
    id: "12340",
    rest: "Pizza Hut",
    date: "24 Ene, 20:00",
    total: 22.0,
    items: "Pizza Grande x1",
    status: "Entregado",
    img: "https://upload.wikimedia.org/wikipedia/sco/thumb/d/d2/Pizza_Hut_logo.svg/2177px-Pizza_Hut_logo.svg.png",
  },
  {
    id: "12100",
    rest: "Starbucks",
    date: "20 Ene, 09:15",
    total: 8.5,
    items: "Latte Venti x1",
    status: "Cancelado",
    img: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png",
  },
];

export default function HistorialPedidosVista() {
  const router = useRouter();

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.img }}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.restName}>{item.rest}</Text>
          <Text style={styles.total}>${item.total.toFixed(2)}</Text>
        </View>
        <Text style={styles.items}>
          {item.items} • {item.date}
        </Text>
        <View style={styles.row}>
          <View
            style={[
              styles.statusBadge,
              item.status === "Cancelado"
                ? styles.statusRed
                : styles.statusGreen,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.status === "Cancelado" ? styles.textRed : styles.textGreen,
              ]}
            >
              {item.status}
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

      <FlatList
        data={PAST_ORDERS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
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
