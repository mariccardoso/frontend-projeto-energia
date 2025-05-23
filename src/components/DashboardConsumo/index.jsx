"use client";

import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

import styles from './DashboardConsumo.module.css';

const cores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EF0', '#EF6B6B'];

const DashboardConsumo = ({ equipamentos }) => {
  if (!equipamentos.length) return <p className={styles.vazio}>Nenhum equipamento adicionado.</p>;

  // Agrupamento por cômodo
  const consumoPorComodo = equipamentos.reduce((acc, item) => {
  const potencia = Number(item.potencia);
  const tempoUso = Number(item.tempoUso);
  if (isNaN(potencia) || isNaN(tempoUso)) return acc;
  const nomeComodo = item.comodo?.nome || item.comodoId || "Desconhecido";
  const consumo = (potencia * tempoUso) / 1000;
  acc[nomeComodo] = (acc[nomeComodo] || 0) + consumo;
  return acc;
}, {});

  const dataPizza = Object.entries(consumoPorComodo).map(([comodo, consumo]) => ({
    name: comodo,
    value: parseFloat(consumo.toFixed(2)),
  }));

  // Top 5 maiores consumidores
  const dataBarras = [...equipamentos]
    .map(eq => ({
      nome: eq.nome,
      consumo: parseFloat(((eq.potencia * eq.tempoUso) / 1000).toFixed(2)),
    }))
    .sort((a, b) => b.consumo - a.consumo)
    .slice(0, 5);

  return (
    <div className={styles.dashboardonConsumo}>
      <h2>📊 Análise de Consumo</h2>
      <div className={styles.graficos}>
        <div className={styles.grafico}>
          <h4>Consumo por Cômodo</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataPizza}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                fill="#8884d8"
                label
              >
                {dataPizza.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.grafico}>
          <h4>Top Equipamentos</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart layout="vertical" data={dataBarras}>
              <XAxis type="number" unit=" kWh" />
              <YAxis dataKey="nome" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="consumo" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardConsumo;
