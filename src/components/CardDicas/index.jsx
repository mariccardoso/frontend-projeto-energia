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
  return (
    <div className={styles.container}>
      {comodos.map((card, index) => (
        <div className={styles.card} key={index}>
          <div
            className={styles.imagem}
            style={{ backgroundImage: `url(${card.imagem})` }}
          >
            <div className={styles.overlay}>
              <h3>{card.titulo}</h3>
              <ul>
                {card.dicas.map((dica, idx) => (
                  <li key={idx}>{dica}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
