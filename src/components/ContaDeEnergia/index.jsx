// components/ContaDeEnergia.jsx

import React from "react";
import styles from "./ContaDeEnergia.module.css";

const PRECO_KWH = 0.85; // Valor médio do kWh no Brasil em R$ (pode ser ajustado)

const ContaDeEnergia = ({ equipamentos }) => {
  // Cálculo total de consumo e valor
  const consumoTotalKwh = equipamentos.reduce((total, item) => {
    const consumo = (item.potencia * item.tempoUso) / 1000;
    return total + consumo;
  }, 0);

  const valorEstimado = consumoTotalKwh * PRECO_KWH;

  return (
    <div className={styles.contaEnergia}>
      <h2>Conta de Energia</h2>
      <div className={styles.container}>
        <div className={styles.infoConta}>
          <div className={styles.consumoTotal}>
            <p>
              <strong>Consumo Total:</strong> {consumoTotalKwh.toFixed(2)} kWh
            </p>
          </div>
          <div className={styles.valorEstimado}>
            <p>
              <strong>Valor Estimado:</strong> R$ {valorEstimado.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContaDeEnergia;
