"use client";

import React from "react";
import styles from "./ContaDeEnergia.module.css";
import Image from "next/image";
const PRECO_KWH = 0.85; // Valor médio do kWh no Brasil em R$

const ContaDeEnergia = ({ equipamentos }) => {
  const consumoHoraKwh = equipamentos.reduce((total, item) => {
    const potencia = Number(item.potencia);
    if (isNaN(potencia)) return total;
    return total + potencia / 1000;
  }, 0);

  const consumoDiaKwh = equipamentos.reduce((total, item) => {
    const potencia = Number(item.potencia);
    const tempoUso = Number(item.tempoUso);
    if (isNaN(potencia) || isNaN(tempoUso)) return total;
    return total + (potencia * tempoUso) / 1000;
  }, 0);

  const consumoSemanaKwh = consumoDiaKwh * 7;
  const consumoMesKwh = consumoDiaKwh * 30;

  const valorHora = consumoHoraKwh * PRECO_KWH;
  const valorDia = consumoDiaKwh * PRECO_KWH;
  const valorSemana = consumoSemanaKwh * PRECO_KWH;
  const valorMes = consumoMesKwh * PRECO_KWH;

  return (
    <div className={styles.contaEnergia}>
      <h2>
        <Image
          className={styles.iconDinheiro}
          src="/iconDinheiro.png"
          alt="Ícone de Dinheiro"
          width={40}
          height={40}
        />
        Conta de Energia
      </h2>
      <div className={styles.infoConta}>
        <div className={styles.blocoConsumo}>
          <h3>Consumo de Energia</h3>
          <p><strong>Por hora:</strong> {consumoHoraKwh.toFixed(2)} kWh</p>
          <p><strong>Por dia:</strong> {consumoDiaKwh.toFixed(2)} kWh</p>
          <p><strong>Por semana:</strong> {consumoSemanaKwh.toFixed(2)} kWh</p>
          <p><strong>Por mês:</strong> {consumoMesKwh.toFixed(2)} kWh</p>
        </div>
        <div className={styles.blocoValor}>
          <h3>Gasto Estimado</h3>
          <p><strong>Por hora:</strong> R$ {valorHora.toFixed(2)}</p>
          <p><strong>Por dia:</strong> R$ {valorDia.toFixed(2)}</p>
          <p><strong>Por semana:</strong> R$ {valorSemana.toFixed(2)}</p>
          <p><strong>Por mês:</strong> R$ {valorMes.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ContaDeEnergia;