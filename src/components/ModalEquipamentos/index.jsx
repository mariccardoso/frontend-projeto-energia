"use client";

import React, { useState } from "react";
import styles from "./ModalEquipamentos.module.css";

export default function ModalEquipamentos({ comodo, onFechar, onAdicionar }) {
  const [selecionado, setSelecionado] = useState(null);
  const [tempoUso, setTempoUso] = useState("");

  // Handler para selecionar dispositivo pelo nome
  const handleSelect = (e) => {
    const dispositivo = comodo.dispositivos.find(
      (item) => item.nome === e.target.value
    );
    setSelecionado(dispositivo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selecionado || !tempoUso) return;

    // Monta o payload com os dados do dispositivo selecionado e tempo de uso informado
    const payload = {
      ...selecionado,
      tempoUso: Number(tempoUso),
      comodoId: comodo.id,
    };

    onAdicionar(payload);
    onFechar();
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
              {comodo.dispositivos && comodo.dispositivos.length > 0 ? (
                comodo.dispositivos.map((eq, idx) => (
                  <option key={eq.nome + idx} value={eq.nome}>
                    {eq.nome}
                  </option>
                ))
              ) : (
                <option disabled>
                  Nenhum equipamento cadastrado neste cômodo
                </option>
              )}
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