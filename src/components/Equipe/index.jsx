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
    },
    {
        nome: "Thiago Ferreira",
        github: "https://github.com/thiago-rferreira",
        foto: "/thiago.jpg"
    },
    {
        nome: "Marcello Carboni",
        github: "https://github.com/mapcarboni",
        foto: "/carbonara.jpg"
    },
    {
        nome: "Eduardo Correia",
        github: "https://github.com/Eduardo1985S"
    },
    {
        nome: "Felipe Santos",
        github: "https://github.com/FelipeSantos92Dev"
    }
];

export default function Equipe() {
    return (
        <div className={styles.equipe}>
        <div className={styles.equipeTitle}>
        <h3 className={styles.subtitle}>Conheça Nossa Equipe</h3>
        </div>
        <ul className={styles.equipeList}>
          {equipe.map((member, index) => (
            <li key={index} className={styles.equipeMember}>
              <img
                src={
                  member.foto
                    ? member.foto
                    : `https://github.com/${member.github.split('/').pop()}.png`
                }
                alt={`Foto de perfil de ${member.nome}`}
                className={member.nome === "Thiago Ferreira" ? `${styles.profilePic} ${styles.thiagoPic}` : styles.profilePic}
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