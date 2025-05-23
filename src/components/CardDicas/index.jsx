import styles from './CardDicas.module.css';

const comodos = [
  {
    titulo: 'Quarto',
    imagem: '/quarto.jpg',
    dicas: [
      'Desligue o carregador da tomada quando não estiver em uso.',
      'Evite deixar eletrônicos em standby (TV, videogame).',
      'Prefira lâmpadas LED e use iluminação natural sempre que possível.'
    ]
  },
  {
    titulo: 'Banheiro',
    imagem: '/banheiro.webp',
    dicas: [
      'Evite banhos longos com aquecedor elétrico.',
      'Desligue o chuveiro ao se ensaboar.',
      'Use aquecedores de ambiente com moderação.'
    ]
  },
  {
    titulo: 'Sala',
    imagem: '/sala.jpg',
    dicas: [
      'Desligue a TV e aparelhos quando ninguém estiver usando.',
      'Use régua com botão para cortar a energia de vários equipamentos.',
      'Aproveite a luz natural durante o dia.'
    ]
  },
  {
    titulo: 'Cozinha',
    imagem: '/cozinha.png',
    dicas: [
      'Evite abrir a geladeira frequentemente.',
      'Use o micro-ondas com consciência (não como aquecedor).',
      'Desligue aparelhos como cafeteiras e torradeiras após o uso.'
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
