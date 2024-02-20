import { Mask } from "./Field/types";
import { FieldSize } from "./types";

export function createField({ width, height, mines }: FieldSize): number[][] {
  
  let matrix: number[][] = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );

  const inc = (x: number, y: number) => {
    if (x >= 0 && x < width && y >= 0 && y < height) {
      if (matrix[y][x] === Mask.Mine) return;
      matrix[y][x] += 1;
    }
  };

  for (let i = 0; i < mines; ) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    if (matrix[y][x] === Mask.Mine) continue;
    matrix[y][x] = Mask.Mine;

    i++;

    inc(x + 1, y);
    inc(x - 1, y);
    inc(x, y + 1);
    inc(x, y - 1);
    inc(x + 1, y + 1);
    inc(x - 1, y + 1);
    inc(x + 1, y - 1);
    inc(x - 1, y - 1);
  }

  return matrix;
}

export function maskField(width: number, height: number, value: any):number[][] {
  return Array.from({ length: height }, () => Array.from({ length: width }, () => value));
}
