"use client";

import React from "react";
import styles from "./ContaDeEnergia.module.css";
import Image from "next/image";
const PRECO_KWH = 0.85; // Valor médio do kWh no Brasil em R$

const ContaDeEnergia = ({ equipamentos }) => {
  // Consumo total em kWh por hora (se todos ligados juntos por 1h)
  const consumoHoraKwh = equipamentos.reduce((total, item) => {
    const potencia = Number(item.potencia);
    if (isNaN(potencia)) return total;
    return total + potencia / 1000;
  }, 0);

  // Consumo total em kWh por dia (considerando tempo de uso de cada um)
  const consumoDiaKwh = equipamentos.reduce((total, item) => {
    const potencia = Number(item.potencia);
    const tempoUso = Number(item.tempoUso);
    if (isNaN(potencia) || isNaN(tempoUso)) return total;
    return total + (potencia * tempoUso) / 1000;
  }, 0);

  // Consumo total em kWh por semana e mês
  const consumoSemanaKwh = consumoDiaKwh * 7;
  const consumoMesKwh = consumoDiaKwh * 30;

  // Valores estimados em reais
  const valorHora = consumoHoraKwh * PRECO_KWH;
  const valorDia = consumoDiaKwh * PRECO_KWH;
  const valorSemana = consumoSemanaKwh * PRECO_KWH;
  const valorMes = consumoMesKwh * PRECO_KWH;

  return (
    <div className={styles.contaEnergia}>
      <h2>
        <Image className={styles.iconDinheiro} src="/iconDinheiro.png" alt="Ícone de Dinheiro" width={30} height={30} />
        Conta de Energia
      </h2>
      <div className={styles.infoConta}>
        <div className={styles.blocoConsumo}>
          <h3>Consumo de Energia</h3>
          <p><strong>Por hora:</strong> {consumoHoraKwh.toFixed(3)} kWh</p>
          <p><strong>Por dia:</strong> {consumoDiaKwh.toFixed(3)} kWh</p>
          <p><strong>Por semana:</strong> {consumoSemanaKwh.toFixed(3)} kWh</p>
          <p><strong>Por mês:</strong> {consumoMesKwh.toFixed(3)} kWh</p>
        </div>
        <div className={styles.blocoValor}>
          <h3>Gasto Estimado</h3>
          <p><strong>Por hora:</strong> R$ {valorHora.toFixed(2)}</p>
          <p><strong>Por dia:</strong> R$ {valorDia.toFixed(2)}</p>
          <p><strong>Por semana:</strong> R$ {valorSemana.toFixed(2)}</p>
          <p><strong>Por mês:</strong> R$ {valorMes.toFixed(2)}</p>
        </div>
      </div>

      {equipamentos.length > 0 && (
        <div className={styles.tabelaDispositivos}>
          <h3 style={{ marginTop: "2rem", marginBottom: "1rem", color: "#ffe600", textAlign: "center" }}>
            Gasto por Dispositivo
          </h3>
          <table className={styles.tabelaSimples}>
            <thead>
              <tr>
                <th>Dispositivo</th>
                <th>kWh/mês</th>
                <th>R$/mês</th>
              </tr>
            </thead>
            <tbody>
              {equipamentos.map((item, idx) => {
                const potencia = Number(item.potencia);
                const tempoUso = Number(item.tempoUso);
                if (isNaN(potencia) || isNaN(tempoUso)) return null;
                const consumoMes = (potencia * tempoUso * 30) / 1000;
                const valorMes = consumoMes * PRECO_KWH;
                return (
                  <tr key={item.nome + idx}>
                    <td>{item.nome}</td>
                    <td>{consumoMes.toFixed(2)}</td>
                    <td>R$ {valorMes.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContaDeEnergia;