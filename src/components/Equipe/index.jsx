import styles from './Equipe.module.css';

const equipe = [
    {
        nome: "Caio Lacerda",
        github: "https://github.com/CaioLacerdaDev"
    },
    {
        nome: "Fernanda Alves",
        github: "https://github.com/F3rNnd4"
    },
    {
        nome: "Flávia Mendes",
        github: "https://github.com/flaviamendes17"
    },
    {
        nome: "Julia Neves",
        github: "https://github.com/Julianeves01",
    },
    {
        nome: "Mariana Cardoso",
        github: "https://github.com/mariccardoso"
    },
    {
        nome: "Samuel Braga",
        github: "https://github.com/samuelbrag4"
    }
];

export default function Equipe() {
    return (
        <div className={styles.equipe}>
        <h3 className={styles.subtitle}>Conheça Nossa Equipe</h3>
        <ul className={styles.equipeList}>
          {equipe.map((member, index) => (
            <li key={index} className={styles.equipeMember}>
              <img
                src={`${member.github}.png`}
                alt={`Foto de perfil de ${member.nome}`}
                className={styles.profilePic}
              />
              <div>
                <p className={styles.memberName}>{member.nome}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                >
                  GitHub
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
}