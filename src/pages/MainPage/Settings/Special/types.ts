import { SpecialField } from "../types";

export interface PropsSpecial {
  level: string;
  specialField: SpecialField;
  onChangeLevel(e: React.ChangeEvent<HTMLInputElement>): void;
  onChangeSpecialField(e: React.ChangeEvent<HTMLInputElement>, field: string): void;
  onChangeInputBasicValue(field: string): void;
}
