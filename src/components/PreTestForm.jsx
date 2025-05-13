import React, { useState } from "react";
import Game from "./Game";
import "../styles/PreTestForm.css";

function PreTestForm() {
  const [showGame, setShowGame] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const [formData, setFormData] = useState({
    edad: "",
    estudios: "",
    ocupacion: "",
    mano: "",
    trastorno: "",
    trastornoDetalle: "",
    medicacion: "",
    medicacionDetalle: "",
    neurologico: "",
    lesion: "",
    evaluacion: "",
    durmio: "",
    cafeina: "",
    tabaco: "",
    alcohol: "",
    drogas: "",
    otraMed: "",
    otraMedDetalle: "",
    estadoAnimo: "",
    menstruacion: "",
    anticonceptivos: "",
    haHechoTest: "",
    conoceTest: "",
    acepta: "",
    grupo: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.acepta === "Sí") {
      setShowGame(true);
    } else {
      alert("Debes aceptar participar para continuar.");
    }
  };

  if (showGame) return <Game formData={formData} />;

  return (
    <div className="form-wrapper">
      <h1 className="form-title">Cuestionario previo al Iowa Gambling Task</h1>

      <button className="btn-rules" onClick={() => setShowRules(true)}>
        Ver reglas del juego
      </button>

      {showRules && (
        <div className="modal-overlay" onClick={() => setShowRules(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Reglas del juego</h2>
            <p>
              En este test, deberás seleccionar entre 4 mazos de cartas (A, B, C
              y D). Cada elección te otorgará una ganancia, pero algunas también
              implican pérdidas. El objetivo es maximizar tus ganancias. No
              sabrás al principio qué mazos son mejores o peores; deberás
              aprenderlo con la experiencia.
            </p>
            <button onClick={() => setShowRules(false)}>Cerrar</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="formulario" noValidate>
        {/* Sección 1: Sociodemográficos */}
        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            id="edad"
            name="edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="estudios">Nivel de estudios:</label>
          <select
            id="estudios"
            name="estudios"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Secundaria">Educación Secundaria</option>
            <option value="Bachillerato">Bachillerato</option>
            <option value="Grado">Grado Universitario</option>
            <option value="Posgrado">Posgrado</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ocupacion">¿Trabajas actualmente o estudias?</label>
          <select
            id="ocupacion"
            name="ocupacion"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
            <option value="Ambos">Ambos</option>
            <option value="Ninguno">Ninguno</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mano">Mano dominante:</label>
          <select id="mano" name="mano" onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="Diestra">Diestra</option>
            <option value="Zurda">Zurda</option>
            <option value="Ambidiestra">Ambidiestra</option>
          </select>
        </div>

        {/* Sección 2: Historial clínico y psicológico */}
        <div className="form-group">
          <label htmlFor="trastorno">
            ¿Diagnóstico psicológico/psiquiátrico previo?
          </label>
          <select
            id="trastorno"
            name="trastorno"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.trastorno === "Sí" && (
          <div className="form-group">
            <label htmlFor="trastornoDetalle">Especifica:</label>
            <input
              type="text"
              name="trastornoDetalle"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="medicacion">
            ¿Tomas medicación psiquiátrica actualmente?
          </label>
          <select
            id="medicacion"
            name="medicacion"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.medicacion === "Sí" && (
          <div className="form-group">
            <label htmlFor="medicacionDetalle">¿Cuál y dosis aproximada?</label>
            <input
              type="text"
              name="medicacionDetalle"
              onChange={handleChange}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="neurologico">¿Diagnóstico neurológico?</label>
          <select
            id="neurologico"
            name="neurologico"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lesion">
            ¿Lesión cerebral o pérdida prolongada de consciencia?
          </label>
          <select id="lesion" name="lesion" onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="evaluacion">
            ¿Te han hecho una evaluación neuropsicológica?
          </label>
          <select
            id="evaluacion"
            name="evaluacion"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Sección 3: Condiciones del día */}
        <div className="form-group">
          <label htmlFor="durmio">¿Dormiste bien anoche (mín. 6 horas)?</label>
          <select id="durmio" name="durmio" onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {["cafeina", "tabaco", "alcohol", "drogas"].map((sustancia) => (
          <div key={sustancia} className="form-group">
            <label htmlFor={sustancia}>
              {sustancia === "cafeina"
                ? "¿Has consumido en las últimas 4 horas más de 6 mg de cafeína por cada kilo de tu peso? (Por ejemplo, si pesas 60 kg, serían más de 360 mg de cafeína, lo que equivale a unos 3 cafés fuertes o más)."
                : sustancia === "alcohol"
                ? "¿Has consumido alcohol en las últimas 48h?"
                : sustancia === "drogas"
                ? "¿Has consumido drogas en las últimas 72h?"
                : `¿Has consumido ${sustancia} en las últimas 12h?`}
            </label>
            <select
              id={sustancia}
              name={sustancia}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="otraMed">
            ¿Has tomado alguna otra medicación hoy?
          </label>
          <select id="otraMed" name="otraMed" onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>
        {formData.otraMed === "Sí" && (
          <div className="form-group">
            <label htmlFor="otraMedDetalle">Especifica:</label>
            <input type="text" name="otraMedDetalle" onChange={handleChange} />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="estadoAnimo">¿Cómo te sientes ahora?</label>
          <select
            id="estadoAnimo"
            name="estadoAnimo"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Nada">Nada</option>
            <option value="Poco">Poco</option>
            <option value="Moderadamente">Moderadamente</option>
            <option value="Mucho">Mucho</option>
            <option value="Extremadamente">Extremadamente</option>
          </select>
        </div>

        {/* Mujeres */}
        <div className="form-group">
          <label htmlFor="menstruacion">
            ¿Estás con la menstruación o en días previos?
          </label>
          <select
            id="menstruacion"
            name="menstruacion"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
            <option value="No lo sé">No lo sé</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="anticonceptivos">
            ¿Usas anticonceptivos hormonales?
          </label>
          <select
            id="anticonceptivos"
            name="anticonceptivos"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Sección 4: Expectativas y consentimiento */}
        <div className="form-group">
          <label htmlFor="haHechoTest">¿Has hecho este test antes?</label>
          <select
            id="haHechoTest"
            name="haHechoTest"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="conoceTest">¿Sabes de qué trata el test?</label>
          <select
            id="conoceTest"
            name="conoceTest"
            onChange={handleChange}
            required
          >
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="acepta">¿Aceptas participar voluntariamente?</label>
          <select id="acepta" name="acepta" onChange={handleChange} required>
            <option value="">Selecciona</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grupo">Clasificación del grupo:</label>
          <select id="grupo" name="grupo" onChange={handleChange}>
            <option value="">Selecciona</option>
            <option value="Control">Control</option>
            <option value="Ansiedad Generalizada">Ansiedad Generalizada</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="observaciones">
            Observaciones durante la entrevista:
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            rows="3"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn-submit">
          Iniciar juego
        </button>
      </form>
    </div>
  );
}

export default PreTestForm;
