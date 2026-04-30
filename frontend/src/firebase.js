import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your config (same as yours)
const firebaseConfig = {
  apiKey: "AIzaSyDfraCTQ1liWCzfJxOSUvPkfF21OtZnseM",
  authDomain: "team-task-manager-abc36.firebaseapp.com",
  projectId: "team-task-manager-abc36",
  storageBucket: "team-task-manager-abc36.appspot.com",
  messagingSenderId: "894937727555",
  appId: "1:894937727555:web:6f9da7a433bcbdd4374af6"
};

// Init app
const app = initializeApp(firebaseConfig);

// ✅ IMPORTANT
export const auth = getAuth(app);