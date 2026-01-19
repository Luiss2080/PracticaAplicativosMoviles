import { FontAwesome } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { usePerfilControlador } from "../controladores/usePerfilControlador";

export default function PerfilVista() {
  const {
    usuario,
    modoOscuro,
    setModoOscuro,
    notificaciones,
    setNotificaciones,
    cerrarSesion,
  } = usePerfilControlador();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Mi Perfil" }} />

      {/* Header / Avatar Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome name={usuario.avatar as any} size={80} color="#333" />
        </View>
        <Text style={styles.name}>{usuario.nombre}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ajustes</Text>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <FontAwesome
              name="moon-o"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.rowText}>Modo Oscuro</Text>
          </View>
          <Switch value={modoOscuro} onValueChange={setModoOscuro} />
        </View>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <FontAwesome
              name="bell-o"
              size={20}
              color="#666"
              style={styles.icon}
            />
            <Text style={styles.rowText}>Notificaciones</Text>
          </View>
          <Switch value={notificaciones} onValueChange={setNotificaciones} />
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f5" },
  header: {
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 20,
  },
  avatarContainer: { marginBottom: 10 },
  name: { fontSize: 24, fontWeight: "bold", color: "#333" },
  email: { fontSize: 14, color: "#888", marginBottom: 10 },
  section: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginTop: 15,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  rowLeft: { flexDirection: "row", alignItems: "center" },
  icon: { width: 30, marginRight: 10, textAlign: "center" },
  rowText: { fontSize: 16, color: "#333" },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
