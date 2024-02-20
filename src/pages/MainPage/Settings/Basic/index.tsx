import styles from "./basic.module.scss";
import { PropsBasic } from "./types";


function Basic({onChangeLevel}:PropsBasic ) {
  return (
    <div className={styles.basic}>
      <label className={styles.basic__item}>
        <input
          type="radio"
          name="level"
          defaultValue="easy"
          onChange={(e) => onChangeLevel(e)}
        />
        Лёгкий (8x8, 10 мин);
      </label>
      <label className={styles.basic__item}>
        <input
          type="radio"
          name="level"
          defaultValue="average"
          onChange={(e) => onChangeLevel(e)}
        />
        Средний (16x16, 40 мин);
      </label>
      <label className={styles.basic__item}>
        <input
          type="radio"
          name="level"
          defaultValue="difficult"
          onChange={(e) => onChangeLevel(e)}
        />
        Сложный (32x16, 100 мин);
      </label>
    </div>
  );
}

export default Basic;
