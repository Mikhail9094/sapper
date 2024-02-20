import { useContext, useState } from "react";
import styles from "./settings.module.scss";
import { PropsSettings, SpecialField } from "./types";
import CustomButton from "../../../Components/CustomButton";
import Basic from "./Basic";
import Special from "./Special";
import { GameContext } from "../../../context/context";
import { createField, maskField } from "../functions";
import { Mask } from "../Field/types";
import { FieldSize } from "../types";

function Settings({ onChangeVisible }: PropsSettings) {
  const [specialField, setSpecialField] = useState<SpecialField>({
    width: "8",
    height: "8",
    mines: "10",
  });
  const [level, setLevelSettings] = useState<string>("");
  const { onChangeLevelAndField } = useContext(GameContext);

  const onChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevelSettings(e.target.defaultValue);
  };

  const onChangeInputBasicValue = (field: string) => {
    setSpecialField((prev) => ({ ...prev, [field]: "" }));
  };

  const onChangeSpecialField = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setSpecialField((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const saveSettings = () => {
    const userField: FieldSize = {
      width: Number(specialField.width),
      height: Number(specialField.height),
      mines: Number(specialField.mines),
    };

    switch (level) {
      case "easy":
        onChangeVisible();
        onChangeLevelAndField(
          level,
          10,
          { width: 8, height: 8, mines: 10 },
          createField({ width: 8, height: 8, mines: 10 }),
          maskField(8, 8, Mask.Fill)
        );
        break;
      case "average":
        onChangeVisible();
        onChangeLevelAndField(
          level,
          40,
          { width: 16, height: 16, mines: 40 },
          createField({ width: 16, height: 16, mines: 40 }),
          maskField(16, 16, Mask.Fill)
        );
        break;
      case "difficult":
        onChangeVisible();
        onChangeLevelAndField(
          level,
          100,
          { width: 32, height: 16, mines: 100 },
          createField({ width: 32, height: 16, mines: 100 }),
          maskField(32, 16, Mask.Fill)
        );
        break;
      case "special":
        onChangeVisible();
        onChangeLevelAndField(
          level,
          userField.mines,
          userField,
          createField(userField),
          maskField(userField.width, userField.height, Mask.Fill)
        );
        break;
      default:
        onChangeVisible();
        break;
    }
  };

  return (
    <div className={styles.settings}>
      <header className={styles.settings__header}>
        <h2>Настройки</h2>
      </header>
      <section className={styles.settings__level}>
        <Basic onChangeLevel={onChangeLevel} />
        <Special
          level={level}
          specialField={specialField}
          onChangeLevel={onChangeLevel}
          onChangeSpecialField={onChangeSpecialField}
          onChangeInputBasicValue={onChangeInputBasicValue}
        />
      </section>
      <footer className={styles.settings__footer}>
        <CustomButton text="Играть" onClick={() => saveSettings()} />
      </footer>
    </div>
  );
}

export default Settings;
