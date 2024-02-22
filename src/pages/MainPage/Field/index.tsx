import { useContext, useEffect, useState } from "react";
import styles from "./field.module.scss";
import { Mask } from "./types";
import ItemField from "./ItemField";
import { GameContext } from "../../../context/context";
import { changeVisibleField } from "./functions";

function Field() {
  const [mineField, setMineField] = useState<[number, number][]>([]);
  const {
    game,
    startTimer,
    stopTimer,
    changeCountMines,
    startGame,
    gameOver,
    updateMask,
    completeGameSuccessfully,
  } = useContext(GameContext);

  useEffect(() => {
    if (game.status==="waitingStart") setMineField([]);
    if (mineField.length === game.fieldSize.mines) {
      const minesField = mineField.filter((item) => game.field[item[1]][item[0]] !== Mask.Mine);
      if (minesField.length === 0) {
        completeGameSuccessfully();
        stopTimer();
      }
    }
  }, [game.mines]);

  const stopGame = () => {
    stopTimer();
    game.field.forEach((item, itemY) => {
      item.forEach((_, itemX) => {
        if (game.field[itemY][itemX] === Mask.Mine) {
          game.mask[itemY][itemX] = Mask.Empty;
        }
      });
    });
    gameOver();
  };

  const openItemField = (x: number, y: number) => {
    changeVisibleField(x, y, game.fieldSize.width, game.fieldSize.height, game.field, game.mask);
    updateMask();
  };

  const onClick = (x: number, y: number) => {
    if (game.status === "waitingStart") {
      startTimer();
      if (game.field[y][x] === Mask.Mine) {
        stopGame();
      }
      startGame();
      openItemField(x, y);
    }

    if (game.status === "started") {
      if (game.mask[y][x] === Mask.Empty) return;
      if (game.field[y][x] === Mask.Mine) {
        stopGame();
      }
      openItemField(x, y);
    }
  };

  const onLeftButton = (x: number, y: number) => {
    switch (game.mask[y][x]) {
      case Mask.Flag:
        break;
      case Mask.Question:
        break;
      default:
        onClick(x, y);
        break;
    }
  };

  const onRightButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, x: number, y: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (game.mask[y][x] === Mask.Empty) return;
    if (game.mask[y][x] === Mask.Fill && game.mines > 0) {
      setMineField((prev) => [...prev, [x, y]]);
      game.mask[y][x] = Mask.Flag;
      changeCountMines(x, y);
    } else if (game.mask[y][x] === Mask.Flag) {
      game.mask[y][x] = Mask.Question;
    } else if (game.mask[y][x] === Mask.Question) {
      const newMineField = mineField.filter(
        (item) => JSON.stringify(item) !== JSON.stringify([x, y])
      );
      setMineField(newMineField);
      game.mask[y][x] = Mask.Fill;
      changeCountMines(x, y);
    }

    updateMask();
  };

  const changeStyleMask = (x: number, y: number) => {
    switch (game.mask[y][x]) {
      case Mask.Empty:
        return "";
      case Mask.Flag:
        return "mask-flag";
      case Mask.Question:
        return "mask-question";
      default:
        return "mask";
    }
  };

  return (
    <main className={`${styles.field} ${game.status === "ended" && styles.blocked}`}>
      {game.field.map((itemY, y) => (
        <div key={y} className={styles.field__line}>
          {itemY.map((itemX, x) => (
            <ItemField
              key={x}
              item={itemX}
              url="/img/mine.png"
              onClick={() => onLeftButton(x, y)}
              addClass={styles[changeStyleMask(x, y)]}
              onContextMenu={(e) => onRightButton(e, x, y)}
            />
          ))}
        </div>
      ))}
    </main>
  );
}

export default Field;
