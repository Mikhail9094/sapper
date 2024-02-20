import styles from "./customButton.module.scss";

interface Props {
  text?: string;
  src?: string;
  alt?: string;
  onClick(): void;
  addClass?: string;
}

function CustomButton({ text, src, alt, onClick, addClass }: Props) {
  return (
    <button
      className={`${styles.button} ${text && src ? styles.allData : ""} ${addClass}`}
      onClick={onClick}
    >
      {text && src ? (
        <>
          <img src={src} alt={alt} />
          {text}
        </>
      ) : src ? (
        <img src={src} alt={alt} />
      ) : (
        text
      )}
    </button>
  );
}

export default CustomButton;
