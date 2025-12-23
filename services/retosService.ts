// services/retosService.ts
import { get, ref } from 'firebase/database';
import { getApp } from 'firebase/app';
import { db } from '../firebaseConfig';

export type Player = {
  id: string;
  nombre: string;
  apellidos: string;
  edad: number;
  altura: number;
  posicion: string;
  photoUrl: string;
  videoUrl: string;
};

export const getRetosOnce = async (): Promise<Player[]> => {
  console.log('➡️ Llamando a Firebase ruta "jugadores/jugadores" ...');

  // ✅ Prueba definitiva: ¿a qué proyecto/DB está apuntando ESTA lectura?
  const app = getApp();
  console.log('🔥 Firebase projectId:', app.options.projectId);
  console.log('🔥 Firebase databaseURL:', app.options.databaseURL);
  console.log('🔥 DB app projectId:', db.app.options.projectId);
  console.log('🔥 DB app databaseURL:', db.app.options.databaseURL);

  const snapshot = await get(ref(db, 'jugadores/jugadores'));

  if (!snapshot.exists()) {
    console.log('⚠️ No existe la ruta jugadores/jugadores en esta DB.');
    return [];
  }

  const data = snapshot.val(); // { "7eCHkd1oPgxXvmaI1XB9": {...} }

  const lista: Player[] = Object.keys(data).map((key) => {
    const item = data[key];

    return {
      id: key,
      nombre: item.nombre ?? '',
      apellidos: item.apellidos ?? '',
      edad: item.edad ?? 0,
      altura: item.altura ?? 0,
      posicion: item.posicion ?? '',
      photoUrl: item.photoUrl ?? '',
      // por si en algún momento lo escribiste como "videoUrlL" o similar:
      videoUrl: item.videoUrl ?? item.videoUrlL ?? '',
    };
  });

  console.log('✅ lista jugadores:', lista);
  return lista;
};
