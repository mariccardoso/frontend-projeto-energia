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
    fetch("http://localhost:4000/comodos")
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
                      <strong>Potência:</strong> {dispositivo.potencia} W
                    </p>
                    <p>
                      <strong>Tempo de uso:</strong> {dispositivo.tempoUso}{" "}
                      h/dia
                    </p>
                    <p>
                      <strong>Voltagem:</strong> {dispositivo.voltagem} V
                    </p>
                    <p>
                      <strong>Consumo diário:</strong>{" "}
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
