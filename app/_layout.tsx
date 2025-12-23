// app/_layout.tsx
import React, { useEffect } from "react";
import { Link, Stack } from "expo-router";
import { Platform, Pressable, Text } from "react-native";

import * as Notifications from "expo-notifications";

// Asegura que el módulo base se cargue
import "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";

// 1) Permite que se muestren notificaciones (alerta/sonido) cuando se programen/reciban
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


async function setupExpoNotifications() {
  // Android: crea canal ANTES de pedir permisos (Android 13+ lo agradece)
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  // Pide permisos (Android 13+ mostrará el popup si procede)
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
}

export default function RootLayout() {
  useEffect(() => {
    // Subscripciones para limpiar
    let unsubscribeOnMessage: undefined | (() => void);

    (async () => {
      try {
        // 2) Config base de notificaciones (canal + permisos)
        await setupExpoNotifications();

        // 3) Firebase Messaging
        await messaging().registerDeviceForRemoteMessages();

        await messaging().subscribeToTopic("all");
        console.log("✅ Subscribed to topic: all");

        // En iOS es clave; en Android no molesta
        await messaging().requestPermission();

        const token = await messaging().getToken();
        console.log("✅ FCM Token:", token);

        // 4) FOREGROUND: cuando llega un push con la app abierta,
        // lo mostramos como notificación local para que “salte”
        unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
          console.log("📩 Foreground message:", remoteMessage);

          const title =
            remoteMessage.notification?.title ??
            (remoteMessage.data?.title as string) ??
            "Nueva notificación";

          const body =
            remoteMessage.notification?.body ??
            (remoteMessage.data?.body as string) ??
            "Tienes un nuevo mensaje";

          await Notifications.scheduleNotificationAsync({
            content: {
              title,
              body,
              data: remoteMessage.data,
            },
            trigger: null, // ahora mismo
          });
        });
      } catch (e) {
        console.log("❌ Notifications/FCM init error:", e);
      }
    })();

    return () => {
      if (unsubscribeOnMessage) unsubscribeOnMessage();
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#1f2937" },
        headerTintColor: "#fff",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Jugadores disponibles" }} />

      <Stack.Screen
        name="detalle"
        options={{
          title: "Detalle del jugador",
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: "#fff" }}>Inicio</Text>
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="player"
        options={{
          title: "Reproductor",
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: "#fff" }}>Inicio</Text>
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="foto"
        options={{
          title: "Foto del jugador",
          headerRight: () => (
            <Link href="/" asChild>
              <Pressable style={{ paddingHorizontal: 8 }}>
                <Text style={{ color: "#fff" }}>Inicio</Text>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
