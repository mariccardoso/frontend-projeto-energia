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
  const [dispositivoAdicionado, setDispositivoAdicionado] = useState(null);

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
    setDispositivoAdicionado(novoDispositivo);
    setMostrarModal(false);
  };

  return (
    <div className={styles.paginaSimulador}>
      <h1 className={styles.titulo}>
        Simulador de Consumo de Energia Residencial
      </h1>
      <div className={styles.superior}>
        <PlantaInterativa comodos={comodos} onAbrirModal={handleAbrirModal} />
        <ContaDeEnergia
          equipamentos={dispositivoAdicionado ? [dispositivoAdicionado] : []}
        />
      </div>

      <DashboardConsumo
        equipamentos={dispositivoAdicionado ? [dispositivoAdicionado] : []}
      />

      {/* Card do dispositivo adicionado */}
      <div className={styles.cardsDispositivos}>
        {dispositivoAdicionado && (
          <div className={styles.cardDispositivo}>
            <h3>{dispositivoAdicionado.nome}</h3>
            <p>
              <strong>Cômodo:</strong>{" "}
              {dispositivoAdicionado.comodo?.nome ||
                dispositivoAdicionado.comodoId}
            </p>
            <p>
              <strong>Potência:</strong> {dispositivoAdicionado.potencia} W
            </p>
            <p>
              <strong>Tempo de uso:</strong> {dispositivoAdicionado.tempoUso}{" "}
              h/dia
            </p>
            <p>
              <strong>Voltagem:</strong> {dispositivoAdicionado.voltagem} V
            </p>
            <p>
              <strong>Corrente:</strong> {dispositivoAdicionado.corrente} A
            </p>
            <p>
              <strong>Consumo diário:</strong>{" "}
              {dispositivoAdicionado &&
              !isNaN(dispositivoAdicionado.potencia) &&
              !isNaN(dispositivoAdicionado.tempoUso)
                ? (
                    (dispositivoAdicionado.potencia *
                      dispositivoAdicionado.tempoUso) /
                    1000
                  ).toFixed(2)
                : "0.00"}{" "}
              kWh
            </p>
          </div>
        )}
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
