import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ModalEquipamentos.module.css";

export default function ModalEquipamentos({ comodoId, onClose }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [tempoUso, setTempoUso] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/dispositivos")
      .then(res => setEquipamentos(res.data))
      .catch(err => console.error("Erro ao buscar dispositivos:", err));
  }, []);

  const handleSelect = (e) => {
    const dispositivo = equipamentos.find(eq => eq.id === parseInt(e.target.value));
    setSelecionado(dispositivo);
    setTempoUso(""); // zera tempo ao mudar o equipamento
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selecionado || !tempoUso) return;

    const payload = {
      ...selecionado,
      tempoUso: Number(tempoUso),
      comodoId
    };

    try {
      await axios.post("http://localhost:3000/dispositivos", payload);
      alert("Equipamento adicionado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao adicionar equipamento:", error);
      alert("Erro ao adicionar equipamento.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <button className={styles.fechar} onClick={onClose}>×</button>
        <h2 className={styles.titulo}>Adicionar Equipamento</h2>
        <form onSubmit={handleSubmit} className={styles.formulario}>
          <label className={styles.label}>
            Escolha o equipamento:
            <select onChange={handleSelect} defaultValue="" className={styles.select}>
              <option value="" disabled>Selecione</option>
              {equipamentos.map(eq => (
                <option key={eq.id} value={eq.id}>{eq.nome}</option>
              ))}
            </select>
          </label>

          {selecionado && (
            <div className={styles.infoEquipamento}>
              <p><strong>Potência:</strong> {selecionado.potencia}W</p>
              <p><strong>Voltagem:</strong> {selecionado.voltagem}V</p>
              <p><strong>Corrente:</strong> {selecionado.corrente}A</p>
            </div>
          )}

          <label className={styles.label}>
            Tempo de uso diário (em horas):
            <input
              type="number"
              step="0.1"
              min="0"
              value={tempoUso}
              onChange={e => setTempoUso(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          <button type="submit" className={styles.confirmar}>Adicionar</button>
        </form>
      </div>
    </div>
  );
}
