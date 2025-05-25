import styles from "./Header.module.css";


export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
            <h1>Simulador de Consumo</h1>
        </div>
        <nav className={styles.menu}>
            <ul>
            <li><a href="#secao-inicial">Início</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </header>
  );
}
