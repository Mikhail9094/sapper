import { useContext } from "react";
import CustomButton from "../CustomButton";
import styles from "./modal.module.scss";
import { createPortal } from "react-dom";
import { GameContext } from "../../context/context";

function Modal() {
  const { completeGameSuccessfully } = useContext(GameContext);

  const render = () => (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <div className={styles.modal__result}>Ваш результат:</div>
        <div className={styles.modal__save}>
          <h3>Сохранить?</h3>
          <div className={styles.modal__buttons}>
            <CustomButton onClick={() => completeGameSuccessfully()} text="Нет" />
            <CustomButton onClick={() => completeGameSuccessfully()} text="Да" />
          </div>
        </div>
      </div>
    </div>
  );

  const app = document.getElementById("app");
  if (!app) return null;

  return createPortal(render(), app);
}

export default Modal;
