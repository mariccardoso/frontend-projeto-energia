// page.jsx
'use client';
import React, { useEffect, useState } from 'react';
import PlantaInterativa from '../components/PlantaInterativa';
import ModalEquipamentos from '../components/ModalEquipamentos';
import ContaDeEnergia from '../components/ContaDeEnergia';
import DashboardConsumo from '../components/DashboardConsumo';

import styles from './page.module.css';

const Page = () => {
  const [comodos, setComodos] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [comodoSelecionado, setComodoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [equipamentosCasa, setEquipamentosCasa] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/comodos')
      .then(res => res.json())
      .then(data => setComodos(data));
  }, []);

  const handleAbrirModal = (comodo) => {
    setComodoSelecionado(comodo);
    setMostrarModal(true);
  };

  const handleAdicionarDispositivo = (novoDispositivo) => {
    setEquipamentosCasa(prev => [...prev, novoDispositivo]);
    setMostrarModal(false);
  };

  return (
    <div className={styles.paginaSimulador}>
      <h1 className={styles.titulo}>Simulador de Consumo de Energia Residencial</h1>
      <div className={styles.superior}>
        <PlantaInterativa comodos={comodos} onAbrirModal={handleAbrirModal} />
        <ContaDeEnergia equipamentos={equipamentosCasa} />
      </div>

      <DashboardConsumo equipamentos={equipamentosCasa} />

      {mostrarModal && (
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
