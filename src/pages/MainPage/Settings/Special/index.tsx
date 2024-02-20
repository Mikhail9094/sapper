import styles from "./special.module.scss";
import { PropsSpecial } from "./types";

export default function Special({
  level,
  specialField,
  onChangeSpecialField,
  onChangeLevel,
  onChangeInputBasicValue,
}: PropsSpecial) {
  return (
    <div className={styles.special}>
      <label className={styles.special__item}>
        <input
          type="radio"
          name="level"
          defaultValue="special"
          onChange={(e) => onChangeLevel(e)}
        />
        Особый:
      </label>
      <div className={styles.special__field}>
        <div className={styles[`field-item`]}>
          Ширина:
          <input
            type="number"
            min="8"
            max="100"
            value={specialField.width}
            onClick={() => onChangeInputBasicValue("width")}
            onChange={(e) => onChangeSpecialField(e, "width")}
            disabled={level === "special" ? false : true}
          />
        </div>
        <div className={styles[`field-item`]}>
          Высота:
          <input
            type="number"
            min="8"
            max="50"
            value={specialField.height}
            onClick={() => onChangeInputBasicValue("height")}
            onChange={(e) => onChangeSpecialField(e, "height")}
            disabled={level === "special" ? false : true}
          />
        </div>
        <div className={styles[`field-item`]}>
          Мины:
          <input
            type="number"
            min="1"
            max={Number(specialField.width) * Number(specialField.height) - 1}
            value={specialField.mines}
            onClick={() => onChangeInputBasicValue("mines")}
            onChange={(e) => onChangeSpecialField(e, "mines")}
            disabled={level === "special" ? false : true}
          />
        </div>
      </div>
    </div>
  );
}
