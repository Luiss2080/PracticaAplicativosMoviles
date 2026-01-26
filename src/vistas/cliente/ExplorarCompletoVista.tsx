import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  { id: 1, name: "Hamburguesas", icon: "hamburger" },
  { id: 2, name: "Pizza", icon: "pizza-slice" },
  { id: 3, name: "Sushi", icon: "fish" },
  { id: 4, name: "Bebidas", icon: "beer" },
  { id: 5, name: "Postres", icon: "ice-cream" },
];

export default function ExplorarCompletoVista() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={16} color="#94A3B8" />
          <TextInput
            style={styles.input}
            placeholder="Busca comida, restaurantes..."
            placeholderTextColor="#94A3B8"
            value={search}
            onChangeText={setSearch}
            autoFocus={false}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>¿Qué se te antoja?</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={styles.catCard}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name={cat.icon} size={24} color="#EA052C" />
              </View>
              <Text style={styles.catName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Tendencias</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.trendsScroll}
        >
          {[1, 2, 3].map((i) => (
            <TouchableOpacity key={i} style={styles.trendCard}>
              <Image
                source={{
                  uri: `https://source.unsplash.com/random/200x200?food,${i}`,
                }}
                style={styles.trendImage}
              />
              <View style={styles.trendOverlay}>
                <Text style={styles.trendText}>Promo 50%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 15,
    height: 50,
    borderRadius: 12,
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16, color: "#1E293B" },
  scroll: { padding: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 15 },
  catCard: { width: "30%", alignItems: "center", marginBottom: 15 },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  catName: { fontSize: 12, fontWeight: "500", color: "#475569" },
  trendsScroll: { marginHorizontal: -20, paddingHorizontal: 20 },
  trendCard: {
    width: 140,
    height: 140,
    marginRight: 15,
    borderRadius: 12,
    overflow: "hidden",
  },
  trendImage: { width: "100%", height: "100%" },
  trendOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  trendText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
