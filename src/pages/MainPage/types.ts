export interface Game {
  status: string;
  successfully: boolean;
  time: number;
  level: string;
  mines: number;
  field: number[][];
  mask: number[][];
  fieldSize: FieldSize;
}


export interface FieldSize {
  width: number;
  height: number;
  mines: number;
}

