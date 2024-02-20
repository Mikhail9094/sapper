import { Mask } from "./types";

export const changeVisibleField = (
  x: number,
  y: number,
  width: number,
  height: number,
  field: number[][],
  mask: number[][],
) => {
  const emptyPoints: [number, number][] = [];

  const addEmptyPoints = (x: number, y: number) => {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      if (mask[y][x] === Mask.Empty) return;
      if (mask[y][x] === Mask.Flag) return;
      if (mask[y][x] === Mask.Question) return;
      emptyPoints.push([x, y]);
    }
  };

  addEmptyPoints(x, y);

  while (emptyPoints.length) {
    const [x, y] = emptyPoints.pop()!;
    mask[y][x] = Mask.Empty;

    if (field[y][x] !== 0) continue;

    addEmptyPoints(x - 1, y);
    addEmptyPoints(x + 1, y);
    addEmptyPoints(x, y - 1);
    addEmptyPoints(x, y + 1);
    addEmptyPoints(x + 1, y + 1);
    addEmptyPoints(x - 1, y + 1);
    addEmptyPoints(x + 1, y - 1);
    addEmptyPoints(x - 1, y - 1);
  }
};
