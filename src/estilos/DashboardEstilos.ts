import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const DashboardEstilos = StyleSheet.create({
  contenedor: { flex: 1 },
  encabezado: {
    paddingTop: 20, // Reduced top padding as SafeAreaView handles it
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saludo: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  subtitulo: { fontSize: 16, color: "rgba(255,255,255,0.9)", marginTop: 2 },

  botonIcono: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 50,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#ef4444", // Bright red/orange for notification
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#C21833", // Match background to simulate "cutout"
  },
  badgeTexto: { color: "#fff", fontSize: 10, fontWeight: "bold" },

  contenedorBusqueda: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 20, // Add side margins
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  inputBusqueda: { flex: 1, marginLeft: 10, fontSize: 16, color: "#1f2937" },

  contenedorEstadisticas: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 25,
  },
  tarjetaEstadistica: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    flexDirection: "row", // Horizontal layout for stats
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  iconoEstadistica: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  valorTarjeta: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  etiquetaTarjeta: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },

  // White Panel mimicking a BottomSheet
  panelContenido: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 50,
    minHeight: 500, // Ensure it fills screen
  },

  tituloSeccion: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1f2937",
    marginLeft: 20,
    marginBottom: 20,
  },

  cuadricula: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  elementoCuadricula: { width: "25%", alignItems: "center", marginBottom: 20 },
  contenedorIcono: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  etiquetaCuadricula: { fontSize: 13, color: "#4b5563", fontWeight: "600" },

  // Restaurant List Styles
  tarjetaRestaurante: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#f3f4f6",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarRestaurante: {
    width: 50,
    height: 50,
    backgroundColor: "#fff0f0", // Light red bg
    borderRadius: 15,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  nombreRestaurante: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1f2937",
    marginBottom: 4,
  },
  descRestaurante: { color: "#6b7280", fontSize: 14 },

  // Recent Activity
  lista: { paddingHorizontal: 20 },
  elementoLista: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  textoLista: { flex: 1, fontSize: 14, color: "#374151" },
  tiempoLista: { fontSize: 12, color: "#9ca3af" },
});
