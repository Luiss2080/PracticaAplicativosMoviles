import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FavoritosEstilos } from "../estilos/FavoritosEstilos";

const MOCK_FAVORITOS = [
  {
    id: 1,
    nombre: "Burger King",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&w=500&q=80",
  },
  {
    id: 2,
    nombre: "Pizza Hut",
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&w=500&q=80",
  },
  {
    id: 3,
    nombre: "KFC",
    rating: 4.2,
    img: "https://images.unsplash.com/photo-1513639776629-9269d0521304?ixlib=rb-4.0.3&w=500&q=80",
  },
  {
    id: 4,
    nombre: "Starbucks",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&w=500&q=80",
  },
];

export default function FavoritosVista() {
  const router = useRouter();

  return (
    <View style={FavoritosEstilos.contenedor}>
      <LinearGradient
        colors={["#C21833", "#9f1239"]}
        style={FavoritosEstilos.encabezado}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 15 }}
          >
            <FontAwesome5 name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={FavoritosEstilos.tituloEncabezado}>Mis Favoritos</Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={FavoritosEstilos.grid}>
        {MOCK_FAVORITOS.map((fav) => (
          <TouchableOpacity
            key={fav.id}
            style={FavoritosEstilos.card}
            activeOpacity={0.9}
            onPress={() => router.push(`/restaurante/${fav.id}`)}
          >
            <Image source={{ uri: fav.img }} style={FavoritosEstilos.imagen} />
            <View style={FavoritosEstilos.botonCorazon}>
              <FontAwesome5 name="heart" size={14} color="#C21833" solid />
            </View>
            <View style={FavoritosEstilos.info}>
              <Text style={FavoritosEstilos.nombre}>{fav.nombre}</Text>
              <View style={FavoritosEstilos.rating}>
                <FontAwesome5 name="star" size={12} color="#eab308" solid />
                <Text style={FavoritosEstilos.textoRating}>{fav.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
