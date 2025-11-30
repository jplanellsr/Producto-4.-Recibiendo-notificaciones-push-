// app/_layout.tsx
import React from 'react';
import { Stack, Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1f2937' },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Jugadores disponibles',
        }}
      />

      <Stack.Screen
        name="detalle"
        options={{
          title: 'Detalle del jugador',
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: '#fff' }}>Inicio</Text>
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="player"
        options={{
          title: 'Reproductor',
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: '#fff' }}>Inicio</Text>
              </Pressable>
            </Link>
          ),
        }}
      />

      {/* 🔍 Nueva pantalla para ver la foto en zoom */}
      <Stack.Screen
        name="foto"
        options={{
          title: 'Foto del jugador',
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: '#fff' }}>Inicio</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
