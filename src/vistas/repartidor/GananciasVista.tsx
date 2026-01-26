import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGananciasRepartidor } from "../../servicios/BaseDeDatos";
import { useAuthStore } from "../../stores/useAuthStore";

const { width } = Dimensions.get("window");

export default function GananciasVista() {
  const { user } = useAuthStore();
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadGanancias();
  }, [user]);

  const loadGanancias = async () => {
    setLoading(true);
    const data = await getGananciasRepartidor(user?.id || 1);
    setWeeklyData(data);
    setLoading(false);
  };

  const totalWeek = weeklyData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Ganancias</Text>
        <Text style={styles.subTitle}>Resumen semanal</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Balance Card */}
        <LinearGradient
          colors={["#10B981", "#059669"]}
          style={styles.balanceCard}
        >
          <Text style={styles.balanceLabel}>Ganancias Totales (Semana)</Text>
          <Text style={styles.balanceValue}>${totalWeek.toFixed(2)}</Text>
          <View style={styles.balanceRow}>
            <View style={styles.rowItem}>
              <FontAwesome5 name="shopping-bag" size={12} color="#D1FAE5" />
              <Text style={styles.rowText}>
                {weeklyData.length * 5} Entregas (Est.)
              </Text>
            </View>
            <View style={styles.rowItem}>
              <FontAwesome5 name="clock" size={12} color="#D1FAE5" />
              <Text style={styles.rowText}>Conectado</Text>
            </View>
          </View>
        </LinearGradient>

        {loading ? (
          <ActivityIndicator size="large" color="#10B981" />
        ) : (
          <View style={styles.chartContainer}>
            {weeklyData.map((data, index) => {
              const height = (data.amount / 60) * 150; // Scale
              return (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      { height: Math.min(height, 150) || 10 },
                    ]}
                  />
                  <Text style={styles.barLabel}>{data.day}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* Recent Transactions */}
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        <View style={styles.transactionItem}>
          <Text style={{ color: "#94A3B8" }}>
            No hay transacciones recientes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#1E293B" },
  subTitle: { fontSize: 14, color: "#64748B" },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  balanceCard: {
    padding: 25,
    borderRadius: 20,
    marginBottom: 25,
    shadowColor: "#10B981",
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.3,
    elevation: 8,
  },
  balanceLabel: { color: "#D1FAE5", fontSize: 14, marginBottom: 5 },
  balanceValue: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 15,
  },
  balanceRow: { flexDirection: "row", gap: 15 },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  rowText: { color: "#fff", marginLeft: 5, fontSize: 12, fontWeight: "bold" },

  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
  },
  barContainer: { alignItems: "center", flex: 1 },
  bar: {
    width: 8,
    backgroundColor: "#3B82F6",
    borderRadius: 4,
    marginBottom: 10,
  },
  barLabel: { fontSize: 10, color: "#64748B" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  transIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  transInfo: { flex: 1 },
  transTitle: { fontWeight: "bold", color: "#1E293B" },
  transDate: { fontSize: 12, color: "#64748B" },
  transAmount: { fontWeight: "bold", color: "#10B981" },
});
