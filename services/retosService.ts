// services/retosService.ts
import { get, ref } from 'firebase/database';
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

  const snapshot = await get(ref(db, 'jugadores/jugadores'));

  if (!snapshot.exists()) {
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
