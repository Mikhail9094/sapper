import { Mask } from "../types";
import styles from "./itemField.module.scss";

interface Props {
  item: number;
  url: string;
  addClass: string;
  onClick(): void;
  onContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}

function ItemField({ item, url, addClass, onClick, onContextMenu }: Props) {
  const setColor = () => {
    switch (item) {
      case 1:
        return "blue";
      case 2:
        return "green";
      case 3:
        return "red";
      case 4:
        return "dark-blue";
      case 5:
        return "brown";
      case 6:
        return "turquoise";
      case 7:
        return "black";
      case 8:
        return "white";
      default:
        return "";
    }
  };

  return (
    <div
      className={`${styles.itemField} ${item === Mask.Mine && styles.mine} ${
        styles[setColor()]
      } ${addClass}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {item === Mask.Mine ? <img src={url} alt="" /> : item === 0 ? "" : item}
    </div>
  );
}

export default ItemField;
