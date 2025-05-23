"use client";

import React, { useEffect, useState } from "react";
import PlantaInterativa from "../components/PlantaInterativa";
import ModalEquipamentos from "../components/ModalEquipamentos";
import ContaDeEnergia from "../components/ContaDeEnergia";
import DashboardConsumo from "../components/DashboardConsumo";
import styles from "./page.module.css";

const Page = () => {
  const [comodos, setComodos] = useState([]);
  const [comodoSelecionado, setComodoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [dispositivosAdicionados, setDispositivosAdicionados] = useState([]);

  // Buscar cômodos ao carregar a página
  useEffect(() => {
    fetch("http://localhost:4000/comodos")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.comodos)) {
          setComodos(data.comodos);
        } else if (Array.isArray(data)) {
          setComodos(data);
        } else {
          setComodos([]);
        }
      });
  }, []);

  // Função para abrir o modal e selecionar o cômodo
  const handleAbrirModal = (comodoId) => {
    const comodoObj = comodos.find((c) => c.id === comodoId);
    setComodoSelecionado(comodoObj);
    setMostrarModal(true);
  };

  // Função chamada após adicionar um dispositivo
  const handleAdicionarDispositivo = (novoDispositivo) => {
    setDispositivosAdicionados((prev) => [...prev, novoDispositivo]);
    setMostrarModal(false);
  };

  // Remover um dispositivo pelo índice
  const handleRemoverDispositivo = (idx) => {
  setDispositivosAdicionados((prev) =>
    prev.filter((_, i) => i !== idx)
  );
};

  // Remover todos os dispositivos
  const handleRemoverTodos = () => {
    setDispositivosAdicionados([]);
  };

  return (
    <div className={styles.paginaSimulador}>
      <h1 className={styles.titulo}>
        Simulador de Consumo de Energia Residencial
      </h1>
      <div className={styles.superior}>
        <PlantaInterativa comodos={comodos} onAbrirModal={handleAbrirModal} />
        <ContaDeEnergia equipamentos={dispositivosAdicionados} />
      </div>

      <DashboardConsumo equipamentos={dispositivosAdicionados} />

      {/* Cards dos dispositivos adicionados */}
      <div className={styles.cardsDispositivos}>
        {dispositivosAdicionados.length > 0 && (
          <button
            className={styles.btnRemoverTodos}
            onClick={handleRemoverTodos}
          >
            Remover todos
          </button>
        )}
        {dispositivosAdicionados.map((dispositivo, idx) => (
  <div key={dispositivo.id + '+' + idx} className={styles.cardDispositivo}>
    <h3>{dispositivo.nome}</h3>
    <p>
      <strong>Cômodo:</strong>{" "}
      {dispositivo.comodo?.nome || dispositivo.comodoNome || dispositivo.comodoId}
    </p>
    <p>
      <strong>Potência:</strong> {dispositivo.potencia} W
    </p>
    <p>
      <strong>Tempo de uso:</strong> {dispositivo.tempoUso} h/dia
    </p>
    <p>
      <strong>Voltagem:</strong> {dispositivo.voltagem} V
    </p>
    <p>
      <strong>Corrente:</strong> {dispositivo.corrente} A
    </p>
    <p>
      <strong>Marca:</strong> {dispositivo.marca}
    </p>
    <p>
      <strong>Descrição:</strong> {dispositivo.descricao}
    </p>
    <p>
      <strong>Consumo diário:</strong>{" "}
      {dispositivo &&
      !isNaN(dispositivo.potencia) &&
      !isNaN(dispositivo.tempoUso)
        ? (
            (dispositivo.potencia *
              dispositivo.tempoUso) /
            1000
          ).toFixed(2)
        : "0.00"}{" "}
      kWh
    </p>
    <button
      className={styles.btnRemover}
      onClick={() => handleRemoverDispositivo(idx)}
    >
      Remover
    </button>
  </div>
))}
      </div>

      {mostrarModal && comodoSelecionado && (
        <ModalEquipamentos
          comodo={comodoSelecionado}
          onFechar={() => setMostrarModal(false)}
          onAdicionar={handleAdicionarDispositivo}
        />
      )}
    </div>
  );
};

export default Page;