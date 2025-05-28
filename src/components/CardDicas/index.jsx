import { useState } from 'react';
import styles from './CardDicas.module.css';

const comodos = [
  {
    titulo: 'Quarto',
    imagem: '/quarto.jpg',
    dicas: [
      'Desligue o carregador da tomada quando não usar.',
      'Evite eletrônicos em standby.',
      'Prefira lâmpadas LED e luz natural.'
    ]
  },
  {
    titulo: 'Banheiro',
    imagem: '/banheiro.webp',
    dicas: [
      'Evite banhos longos.',
      'Desligue o chuveiro ao se ensaboar.',
      'Use aquecedor só quando necessário.'
    ]
  },
  {
    titulo: 'Sala',
    imagem: '/sala.jpg',
    dicas: [
      'Desligue TV e aparelhos sem uso.',
      'Use régua para cortar energia de vários equipamentos.',
      'Aproveite a luz natural.'
    ]
  },
  {
    titulo: 'Cozinha',
    imagem: '/cozinha.png',
    dicas: [
      'Evite abrir a geladeira várias vezes.',
      'Use o micro-ondas com consciência.',
      'Desligue aparelhos após o uso.'
    ]
  }
];

export default function CardsComodos() {
  const [cardAberto, setCardAberto] = useState(null);
  const comodosOrdenados = [...comodos].sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
  );

  return (
    <>
      <div className={styles.dicasTitle}>
        <h2 className={styles.subtitle}>Dicas De Consumo Ideal</h2>
      </div>
      <div className={styles.container}>
        {comodosOrdenados.map((card, index) => (
          <div
            className={`${styles.card} ${cardAberto === index ? styles.aberto : ''}`}
            key={index}
            onMouseEnter={() => setCardAberto(index)}
            onMouseLeave={() => setCardAberto(null)}
          >
            {cardAberto === index ? (
              <div className={styles.verso}>
                <h3>{card.titulo}</h3>
                <ul>
                  {card.dicas.map((dica, idx) => (
                    <li key={idx}>{dica}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div
                className={styles.frente}
                style={{ backgroundImage: `url(${card.imagem})` }}
              >
                <div className={styles.tituloOverlay}>
                  <span>{card.titulo}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
