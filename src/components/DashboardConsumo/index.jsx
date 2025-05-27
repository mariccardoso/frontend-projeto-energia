"use client";

import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

import styles from './DashboardConsumo.module.css';

const cores = ['#ffe600', '#4d4d4d', '#00a86b', '#ff6f61', '#6b5b95', '#feb236'];


const DashboardConsumo = ({ equipamentos }) => {
  if (!equipamentos.length) return (
  <div className={styles.vazio}>
    <div className={styles.loader}></div>
    <span>Adicione dispositivos para começar a calcular o consumo de energia!</span>
  </div>
);

  // Consumo total dos dispositivos
  const consumoTotal = equipamentos.reduce((total, item) => {
    const potencia = Number(item.potencia);
    const tempoUso = Number(item.tempoUso);
    if (isNaN(potencia) || isNaN(tempoUso)) return total;
    const consumo = (potencia * tempoUso) / 1000;
    return total + consumo;
  }, 0);

  // Dados para o gráfico de pizza: cada dispositivo e sua porcentagem
  const dataPizza = equipamentos.map((item) => {
    const consumo = (Number(item.potencia) * Number(item.tempoUso)) / 1000;
    return {
      name: item.nome + (item.comodo?.nome ? ` (${item.comodo.nome})` : ""),
      value: consumoTotal > 0 ? Number(((consumo / consumoTotal) * 100).toFixed(2)) : 0,
    };
  });

  // Top 5 maiores consumidores (em kWh)
  const dataBarras = [...equipamentos]
    .map(eq => ({
      nome: eq.nome + (eq.comodo?.nome ? ` (${eq.comodo.nome})` : ""),
      consumo: parseFloat(((eq.potencia * eq.tempoUso) / 1000).toFixed(2)),
    }))
    .sort((a, b) => b.consumo - a.consumo)
    .slice(0, 5);

  return (
    <div className={styles.dashboardonConsumo}>
      <h2 className={styles.titulo}>Análise de <span>Consumo</span></h2>
      <div className={styles.graficos}>
        <div className={styles.grafico}>
          <h4 className={styles.subtitulo}>Consumo por Dispositivo (%)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataPizza}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                fill="#8884d8"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {dataPizza.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.grafico}>
          <h4 className={styles.subtitulo}>Top Equipamentos</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={dataBarras}>
              <XAxis type="number" unit=" kWh" />
              <YAxis dataKey="nome" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="consumo" fill="#fae01e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardConsumo;