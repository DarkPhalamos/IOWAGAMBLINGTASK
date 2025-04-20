import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import * as XLSX from "xlsx";

function ExportSecret() {
  useEffect(() => {
    const exportarDatos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "resultados"));
        const data = [];

        snapshot.forEach((doc) => {
          const d = doc.data();
          data.push({
            edad: d.edad || "",
            estudios: d.estudios || "",
            ocupacion: d.ocupacion || "",
            mano: d.mano || "",
            trastorno: d.trastorno || "",
            trastornoDetalle: d.trastornoDetalle || "",
            medicacion: d.medicacion || "",
            medicacionDetalle: d.medicacionDetalle || "",
            neurologico: d.neurologico || "",
            lesion: d.lesion || "",
            evaluacion: d.evaluacion || "",
            durmio: d.durmio || "",
            cafeina: d.cafeina || "",
            tabaco: d.tabaco || "",
            alcohol: d.alcohol || "",
            drogas: d.drogas || "",
            otraMed: d.otraMed || "",
            otraMedDetalle: d.otraMedDetalle || "",
            estadoAnimo: d.estadoAnimo || "",
            menstruacion: d.menstruacion || "",
            anticonceptivos: d.anticonceptivos || "",
            haHechoTest: d.haHechoTest || "",
            conoceTest: d.conoceTest || "",
            acepta: d.acepta || "",
            grupo: d.grupo || "",
            observaciones: d.observaciones || "",
            puntuacionFinal: d.puntuacionFinal || 0,
            timestamp: d.timestamp || "",
          });
        });

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
        XLSX.writeFile(workbook, "iowa_resultados_completos.xlsx");

        console.log("✅ Exportación completada.");
      } catch (error) {
        console.error("❌ Error exportando datos:", error);
      }
    };

    exportarDatos();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Exportando datos...</h2>
      <p>
        Si no se ha descargado automáticamente, revisa los permisos o vuelve a
        intentarlo.
      </p>
    </div>
  );
}

export default ExportSecret;
