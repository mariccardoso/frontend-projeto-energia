// src/components/PlantaInterativa.jsx
import React, { useState } from "react";
import ModalEquipamentos from "../ModalEquipamentos";
import styles from "./PlantaInterativa.module.css";

const COMODOS = [
  { id: 1, nome: "Sala", top: "70%", left: "30%" },
  { id: 2, nome: "Cozinha", top: "25%", left: "30%" },
  { id: 3, nome: "Banheiro", top: "25%", left: "85%" },
  { id: 4, nome: "Quarto", top: "70%", left: "80%" },
];

export default function PlantaInterativa() {
  const [comodoSelecionado, setComodoSelecionado] = useState(null);

  const handleAbrirModal = (comodoId) => {
    setComodoSelecionado(comodoId);
  };

  const handleFecharModal = () => {
    setComodoSelecionado(null);
  };

  return (
    <div className={styles.plantaContainer}>
      <img
        src="/image/plantaCasa.png"
        alt="Planta da casa"
        className={styles.plantaImg}
      />

      {COMODOS.map(({ id, nome, top, left }) => (
        <button
          key={id}
          className={styles.botaoComodo}
          style={{ top, left }}
          onClick={() => handleAbrirModal(id)}
        >
          {nome}
        </button>
      ))}

      {comodoSelecionado && (
        <ModalEquipamentos
          comodoId={comodoSelecionado}
          onClose={handleFecharModal}
        />
      )}
    </div>
  );
}
