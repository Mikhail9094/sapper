import { useContext } from 'react';
import styles from './header.module.scss'
import { GameContext } from '../../../context/context';
import CustomButton from '../../../Components/CustomButton';

function Header() {
  const {game, onRestart} = useContext(GameContext);
  
  return (
    <header className={styles.header}>
        <div className={styles["header__number-mines"]}>{game.mines}</div>
        <CustomButton src='/img/smiling-face.svg' alt="smile" onClick={() => onRestart()} />
        <div className={styles["header__number-mines"]}>{game.time}</div>
      </header>
  )
}

export default Header;
