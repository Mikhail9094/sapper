import { createContext } from "react";
import { FieldSize, Game } from "../pages/MainPage/types";

export const GameContext = createContext({} as Props);

interface Props {
  game: Game;
  updateMask(): void;
  onRestart(): void;
  startGame(): void;
  gameOver(): void;
  startTimer(): void;
  stopTimer(): void;
  changeCountMines(x: number, y: number): void;
  onChangeLevelAndField(
    level: string,
    mines: number,
    fieldSize: FieldSize,
    field: number[][],
    mask: number[][]
  ): void;
  completeGameSuccessfully(): void;
}

// "waitingStart" | "started" | "ended";
