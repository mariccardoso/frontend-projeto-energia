"use client";

import React, { useEffect, useState } from "react";
import PlantaInterativa from "../components/PlantaInterativa";
import ModalEquipamentos from "../components/ModalEquipamentos";
import ContaDeEnergia from "../components/ContaDeEnergia";
import DashboardConsumo from "../components/DashboardConsumo";
import CardDicas from "../components/CardDicas";
import SecaoInicial from "@/components/SecaoInicial";
import Equipe from "@/components/Equipe";
import styles from "./page.module.css";

const Page = () => {
  const [comodos, setComodos] = useState([]);
  const [comodoSelecionado, setComodoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [dispositivosAdicionados, setDispositivosAdicionados] = useState([]);

  // Buscar cômodos ao carregar a página
  useEffect(() => {
    fetch("https://api-energia.projetosds.tech/comodos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setComodos(data);
        } else {
          setComodos([]);
          console.error("API response is not an array:", data);
        }
      })
      .catch((err) => {
        setComodos([]);
        console.error("Erro ao buscar cômodos:", err);
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

  // Remover um dispositivo pelo índice global
  const handleRemoverDispositivo = (idx) => {
    setDispositivosAdicionados((prev) => prev.filter((_, i) => i !== idx));
  };

  // Remover todos os dispositivos de um cômodo
  const handleRemoverTodosDoComodo = (comodoId) => {
    setDispositivosAdicionados((prev) =>
      prev.filter((d) => d.comodoId !== comodoId)
    );
  };

  return (
    <div className={styles.paginaSimulador}>
      <div className={styles.cabecalhoProjeto}>
        <h1>Projeto Energia</h1>
        <img
          src="data:image/png;base64,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"
          alt="Logo SENAI"
          className={styles.logoSenai}
        />
      </div>
      {comodos.length === 0 && (
        <p className={styles.errorMessage}>
          Não foi possível carregar os cômodos. Tente novamente mais tarde.
        </p>
      )}
      <SecaoInicial />
      <div className={styles.superior}>
        <PlantaInterativa comodos={comodos} onAbrirModal={handleAbrirModal} />
        <ContaDeEnergia equipamentos={dispositivosAdicionados} />
      </div>

      <DashboardConsumo equipamentos={dispositivosAdicionados} />

      {/* Dispositivos agrupados por cômodo */}
      {comodos.map((comodo) => {
        // Filtra dispositivos adicionados desse cômodo
        const dispositivosDoComodo = dispositivosAdicionados.filter(
          (d) => d.comodoId === comodo.id
        );

        if (dispositivosDoComodo.length === 0) return null;

        return (
          <section key={comodo.id} className={styles.sessaoComodo}>
            <h2 className={styles.tituloComodo}>{comodo.nome}</h2>
            <div className={styles.cardsDispositivos}>
              {dispositivosDoComodo.map((dispositivo, idx) => {
                // Para remover corretamente, pegue o índice global
                const idxGlobal = dispositivosAdicionados.findIndex(
                  (d) =>
                    d.comodoId === comodo.id &&
                    d.nome === dispositivo.nome &&
                    d.tempoUso === dispositivo.tempoUso
                );
                return (
                  <div
                    key={dispositivo.nome + "+" + idx}
                    className={styles.cardDispositivo}
                  >
                    <h3>{dispositivo.nome}</h3>
                    <p>
                      <span>Potência:</span> {dispositivo.potencia} W
                    </p>
                    <p>
                      <strong>Tempo de uso:</strong> {dispositivo.tempoUso}{" "}
                      h/dia
                    </p>
                    <p>
                      <span>Voltagem:</span> {dispositivo.voltagem} V
                    </p>
                    <p>
                      <span>Consumo diário:</span>{" "}
                      {dispositivo &&
                      !isNaN(dispositivo.potencia) &&
                      !isNaN(dispositivo.tempoUso)
                        ? (
                            (dispositivo.potencia * dispositivo.tempoUso) /
                            1000
                          ).toFixed(2)
                        : "0.00"}{" "}
                      kWh
                    </p>
                    <button
                      className={styles.btnRemover}
                      onClick={() => handleRemoverDispositivo(idxGlobal)}
                    >
                      Remover
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              className={styles.btnRemoverTodos}
              onClick={() => handleRemoverTodosDoComodo(comodo.id)}
            >
              Remover todos
            </button>
          </section>
        );
      })}

      {mostrarModal && comodoSelecionado && (
        <ModalEquipamentos
          comodo={comodoSelecionado}
          onFechar={() => setMostrarModal(false)}
          onAdicionar={handleAdicionarDispositivo}
        />
      )}

      <CardDicas />

      <Equipe />
    </div>
  );
};

export default Page;
