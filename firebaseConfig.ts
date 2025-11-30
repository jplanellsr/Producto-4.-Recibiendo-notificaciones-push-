// firebaseConfig.ts
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDyXAc42aoHKjjL8wKFR_wsCwar1gxHy4U",
  authDomain: "event-personal.firebaseapp.com",
  databaseURL: "https://event-personal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "event-personal",
  storageBucket: "event-personal.firebasestorage.app",
  messagingSenderId: "47798299762",
  appId: "1:47798299762:web:fbde93619c2692629e66eb"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

export const db = getDatabase(app);
