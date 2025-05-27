"use client";

import React from "react";
import styles from "./ContaDeEnergia.module.css";
import Image from "next/image";
const PRECO_KWH = 0.85; // Valor médio do kWh no Brasil em R$

const ContaDeEnergia = ({ equipamentos }) => {
  const consumoTotalKwh = equipamentos.reduce((total, item) => {
  const potencia = Number(item.potencia);
  const tempoUso = Number(item.tempoUso);
  if (isNaN(potencia) || isNaN(tempoUso)) return total;
  const consumo = (potencia * tempoUso) / 1000;
  return total + consumo;
}, 0);

  const valorEstimado = consumoTotalKwh * PRECO_KWH;

  return (
    <div className={styles.contaEnergia}>
      <h2>
      <Image className={styles.iconDinheiro} src="/iconDinheiro.png" alt="Ícone de Dinheiro" width={70} height={70} />
      Conta de Energia
      </h2>
      <div className={styles.infoConta}>
        <p><strong>Consumo Total:</strong> {consumoTotalKwh.toFixed(2)} kWh</p>
        <p><strong>Valor Estimado:</strong> R$ {valorEstimado.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ContaDeEnergia;