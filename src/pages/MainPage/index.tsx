import styles from "./mainPage.module.scss";
import { useRef, useState } from "react";
import Header from "./Header";
import Field from "./Field";
import Footer from "./Footer";
import { createField, maskField } from "./functions";
import { FieldSize, Game } from "./types";
import { GameContext } from "../../context/context";
import { Mask } from "./Field/types";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal";

function MainPage() {
  const [game, setGame] = useState<Game>({
    status: "waitingStart",
    successfully: false,
    time: 0,
    level: "easy",
    mines: 10,
    fieldSize: { width: 8, height: 8, mines: 10 },
    field: createField({ width: 8, height: 8, mines: 10 }),
    mask: maskField(8, 8, Mask.Fill),
  });
  const timerRef = useRef<number | null>(null);

  const completeGameSuccessfully = () => {
    setGame((prev) => ({ ...prev, successfully: !prev.successfully }));
  };

  const startTimer = () => {
    if (timerRef.current !== null) return;
    timerRef.current = window.setInterval(() => changeTime(), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);

      timerRef.current = null;
    }
  };

  function changeCountMines(x: number, y: number) {
    if (game.mask[y][x] === Mask.Flag) {
      setGame((prev) => ({ ...prev, mines: prev.mines - 1 }));
    } else if (game.mask[y][x] === Mask.Fill) {
      setGame((prev) => ({ ...prev, mines: prev.mines + 1 }));
    }
  }

  const updateMask = () => {
    setGame((prev) => ({ ...prev }));
  };

  const startGame = () => {
    setGame((prev) => ({ ...prev, status: "started" }));
  };

  const gameOver = () => {
    setGame((prev) => ({ ...prev, status: "ended" }));
  };

  function changeTime() {
    setGame((prev) => ({ ...prev, time: prev.time + 1 }));
  }

  const onRestart = () => {
    stopTimer();
    setGame((prev) => ({
      ...prev,
      status: "waitingStart",
      mines: prev.fieldSize.mines,
      field: createField(prev.fieldSize),
      mask: maskField(prev.fieldSize.width, prev.fieldSize.height, Mask.Fill),
      time: 0,
    }));
  };

  const onChangeLevelAndField = (
    level: string,
    mines: number,
    fieldSize: FieldSize,
    field: number[][],
    mask: number[][]
  ) => {
    stopTimer();
    setGame((prev) => ({
      ...prev,
      status: "waitingStart",
      level: level,
      mines: mines,
      fieldSize: fieldSize,
      field: field,
      mask: mask,
      time: 0,
      successfully: false,
    }));
  };

  return (
    <GameContext.Provider
      value={{
        game,
        updateMask,
        onRestart,
        startGame,
        gameOver,
        startTimer,
        stopTimer,
        changeCountMines,
        onChangeLevelAndField,
        completeGameSuccessfully,
      }}
    >
      <div id="app" className={styles.wrapper}>
        {game.successfully && <Modal />}
        <div className={styles.links}>
          <Link to="/table-players">Таблица лучших</Link>
        </div>
        <div className={styles.game}>
          <Header />
          <Field />
          <Footer />
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default MainPage;
