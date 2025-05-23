"use client";

import React from "react";
import styles from "./PlantaInterativa.module.css";

export default function PlantaInterativa({ comodos, onAbrirModal }) {
  // Defina posições padrão para cada cômodo pelo nome
  const posicoes = {
    Sala: { top: "70%", left: "30%" },
    Cozinha: { top: "25%", left: "30%" },
    Banheiro: { top: "25%", left: "85%" },
    Quarto: { top: "70%", left: "80%" },
  };

  return (
    <div className={styles.plantaContainer}>
      <img
        src="/image/plantaCasa.png"
        alt="Planta da casa"
        className={styles.plantaImg}
      />

      {comodos.map(({ id, nome }) => (
        <button
          key={id}
          className={styles.botaoComodo}
          style={posicoes[nome] || {}}
          onClick={() => onAbrirModal(id)}
        >
          {nome}
        </button>
      ))}
    </div>
  );
}