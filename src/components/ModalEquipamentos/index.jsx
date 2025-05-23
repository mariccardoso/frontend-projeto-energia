"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ModalEquipamentos.module.css";

export default function ModalEquipamentos({ comodo, onFechar, onAdicionar }) {
  const [modelos, setModelos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [tempoUso, setTempoUso] = useState("");

  // Buscar modelos do backend ao abrir o modal
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/modelos")
      .then((res) => setModelos(res.data))
      .catch((err) => console.error("Erro ao buscar modelos:", err));
  }, []);

  // Handler para selecionar modelo pelo nome
  const handleSelect = (e) => {
    const modelo = modelos.find((item) => item.nome === e.target.value);
    setSelecionado(modelo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selecionado || !tempoUso) return;

    const payload = {
      nome: selecionado.nome,
      potencia: selecionado.potencia,
      voltagem: selecionado.voltagem,
      corrente: selecionado.corrente,
      tempoUso: Number(tempoUso),
      comodoId: comodo.id,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/dispositivos",
        payload
      );
      alert("Equipamento adicionado com sucesso!");
      onAdicionar(res.data);
      onFechar();
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
      alert("Erro ao adicionar equipamento.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.fechar} onClick={onFechar}>
          ×
        </button>
        <h2 className={styles.titulo}>Adicionar Equipamento</h2>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label className={styles.label}>
            Escolha o equipamento:
            <select
              onChange={handleSelect}
              defaultValue=""
              className={styles.select}
              required
            >
              <option value="" disabled>
                Selecione
              </option>
              {modelos.map((eq) => (
                <option key={eq.nome} value={eq.nome}>
                  {eq.nome}
                </option>
              ))}
            </select>
          </label>

          {selecionado && (
            <div className={styles.infoEquipamento}>
              <p>
                <strong>Potência:</strong> {selecionado.potencia}W
              </p>
              <p>
                <strong>Voltagem:</strong> {selecionado.voltagem}V
              </p>
              <p>
                <strong>Corrente:</strong> {selecionado.corrente}A
              </p>
            </div>
          )}

          <label className={styles.label}>
            Tempo de uso diário (em horas):
            <input
              type="number"
              step="0.1"
              min="0"
              value={tempoUso}
              onChange={(e) => setTempoUso(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.confirmar}>
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}