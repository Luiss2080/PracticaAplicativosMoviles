import { FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function DriverTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#EA052C",
        tabBarInactiveTintColor: "#6B7280",
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="shipping-fast" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ganancias"
        options={{
          title: "Ganancias",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="chart-line" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
