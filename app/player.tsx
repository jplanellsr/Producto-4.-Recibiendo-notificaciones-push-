// app/player.tsx
import React, { useRef, useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

export default function PlayerScreen() {
  const params = useLocalSearchParams();

  const nombre = Array.isArray(params.nombre) ? params.nombre[0] : params.nombre;
  const videoUrlParam = Array.isArray(params.videoUrl) ? params.videoUrl[0] : params.videoUrl;

  const videoUrl =
    (videoUrlParam as string) || 'https://www.w3schools.com/html/mov_bbb.mp4';

  const isWeb = Platform.OS === 'web';

  // ----- WEB: usamos <video> HTML grande -----
  if (isWeb) {
    const htmlVideoRef = useRef<any>(null);

    return (
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: '#000',
        }}
      >
        <Text
          style={{
            fontSize: 22,
            marginBottom: 16,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          Vídeo de: {nombre ?? 'Jugador'}
        </Text>

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          {/* @ts-ignore: elemento HTML nativo en web */}
          <video
            ref={htmlVideoRef}
            style={{
              width: '80vw',      // 80% del ancho de la ventana
              maxWidth: 900,
              height: 'auto',
              borderRadius: 8,
            }}
            src={videoUrl}
            controls
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            columnGap: 12,
          }}
        >
          <Button title="PLAY" onPress={() => htmlVideoRef.current?.play()} />
          <Button title="PAUSE" onPress={() => htmlVideoRef.current?.pause()} />
          <Button title="STOP" onPress={() => {
            if (!htmlVideoRef.current) return;
            htmlVideoRef.current.pause();
            htmlVideoRef.current.currentTime = 0;
          }} />
        </View>
      </View>
    );
  }

  // ----- MÓVIL / EMULADOR: usamos expo-av -----
  const videoRef = useRef<Video | null>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#000',
      }}
    >
      <Text
        style={{
          fontSize: 22,
          marginBottom: 16,
          textAlign: 'center',
          color: '#fff',
        }}
      >
        Vídeo de: {nombre ?? 'Jugador'}
      </Text>

      <View
        style={{
          width: '100%',
          height: 300,
          marginBottom: 16,
        }}
      >
        <Video
          ref={videoRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 8,
          }}
          source={{ uri: videoUrl }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={(s) => setStatus(s)}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          columnGap: 12,
        }}
      >
        <Button title="PLAY" onPress={() => videoRef.current?.playAsync()} />
        <Button title="PAUSE" onPress={() => videoRef.current?.pauseAsync()} />
        <Button title="STOP" onPress={() => videoRef.current?.stopAsync()} />
      </View>
    </View>
  );
}
