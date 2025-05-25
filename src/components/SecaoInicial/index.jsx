import React from "react";
import styles from "./SecaoInicial.module.css";
import Image from "next/image";
import plantaImage from "../../../public/image/casa.jpg"
export default function SecaoInicial() {
  return (
    <section className={styles.secaoInicial}>
      <div className={styles.conteudo}>
        <div className={styles.esquerda}>
          <h1>
            Descubra quanto <span className={styles.destaque}>sua casa consome</span> de energia
          </h1>
          <p>
            Simule o consumo elétrico dos cômodos da sua casa e veja onde você pode
            <strong> economizar até 40% na conta de luz</strong>. É rápido, interativo e gratuito.
          </p>
          <button className={styles.cta}>Simular agora</button>

          <div className={styles.metricas}>
            <div className={styles.card}>
              <span className={styles.numero}>+300 </span>
              <span className={styles.descricao}>simulações realizadas</span>
            </div>
            <div className={styles.card}>
              <span className={styles.numero}>5min </span>
              <span className={styles.descricao}>para concluir a análise</span>
            </div>
            <div className={styles.card}>
              <span className={styles.numero}>∞ </span>
              <span className={styles.descricao}>insights para economizar</span>
            </div>
          </div>
        </div>

        <div className={styles.direita}>
          <Image src={plantaImage} alt="Planta da casa" className={styles.imagem} />
        </div>
      </div>
    </section>
  );
}
