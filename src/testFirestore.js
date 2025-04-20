import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export const testFirestoreConnection = async () => {
  try {
    await addDoc(collection(db, "test"), {
      mensaje: "¡Conexión exitosa!",
      timestamp: new Date(),
    });
    console.log("✅ Documento creado correctamente");
  } catch (error) {
    console.error("❌ Error al crear documento:", error);
  }
};
