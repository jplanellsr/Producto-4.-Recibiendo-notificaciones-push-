// app/detalle.tsx
import React from 'react';
import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function DetalleScreen() {
  const params = useLocalSearchParams();

  const nombre = Array.isArray(params.nombre) ? params.nombre[0] : params.nombre;
  const apellidos = Array.isArray(params.apellidos) ? params.apellidos[0] : params.apellidos;
  const edad = Array.isArray(params.edad) ? params.edad[0] : params.edad;
  const altura = Array.isArray(params.altura) ? params.altura[0] : params.altura;
  const posicion = Array.isArray(params.posicion) ? params.posicion[0] : params.posicion;
  const photoUrl = Array.isArray(params.photoUrl) ? params.photoUrl[0] : params.photoUrl;
  const videoUrl = Array.isArray(params.videoUrl) ? params.videoUrl[0] : params.videoUrl;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {photoUrl ? (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/foto',
              params: {
                nombre: nombre ?? '',
                photoUrl: photoUrl ?? '',
              },
            })
          }
        >
          <Image
            source={{ uri: photoUrl as string }}
            style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 16 }}
          />
        </TouchableOpacity>
      ) : null}

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
        {nombre} {apellidos}
      </Text>

      <Text style={{ marginBottom: 4 }}>Posición: {posicion}</Text>
      <Text style={{ marginBottom: 4 }}>Edad: {edad}</Text>
      <Text style={{ marginBottom: 12 }}>Altura: {altura} cm</Text>

      <Button
        title="Ver vídeo del jugador"
        onPress={() =>
          router.push({
            pathname: '/player',
            params: {
              nombre: nombre ?? '',
              videoUrl: videoUrl ?? '',
            },
          })
        }
      />
    </View>
  );
}
