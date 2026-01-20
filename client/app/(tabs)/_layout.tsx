import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width, height } = Dimensions.get('window');

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black', // Color negro para los íconos activos
        tabBarInactiveTintColor: 'gray', // Color gris para los íconos inactivos
        headerShown: false,
        tabBarStyle: styles.tabBarContainer,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="noticias"
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          title: 'El Tiempo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cloud' : 'cloud-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'location' : 'location-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    height: Platform.OS === 'ios' ? 70 : 60, // Altura ajustada para iOS y Android
    paddingBottom: Platform.OS === 'ios' ? 10 : 5,
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
    backgroundColor: 'white', // Fondo blanco
    width: '100%', // Ancho completo
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden', // Asegura que no se desborde
    paddingHorizontal: 10, // Margen horizontal
  },
});
