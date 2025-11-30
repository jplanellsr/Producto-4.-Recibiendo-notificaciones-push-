// app/foto.tsx
import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function FotoScreen() {
  const params = useLocalSearchParams();

  const nombre = Array.isArray(params.nombre) ? params.nombre[0] : params.nombre;
  const photoUrl = Array.isArray(params.photoUrl) ? params.photoUrl[0] : params.photoUrl;

  if (!photoUrl) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text>No hay foto para este jugador.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          marginTop: 8,
          marginBottom: 8,
          fontSize: 18,
        }}
      >
        Foto de: {nombre ?? 'Jugador'} (haz zoom con los dedos)
      </Text>

      {/* ScrollView para permitir zoom (pinch) */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        maximumZoomScale={4}    // hasta x4
        minimumZoomScale={1}
        bouncesZoom={true}
      >
        <Image
          source={{ uri: photoUrl as string }}
          style={{
            width: '100%',
            height: undefined,
            aspectRatio: 3 / 4,  // puedes ajustarlo según tus fotos
          }}
          resizeMode="contain"
        />
      </ScrollView>
    </View>
  );
}
