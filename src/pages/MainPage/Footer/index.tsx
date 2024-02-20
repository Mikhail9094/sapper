import { useState } from "react";
import Settings from "../Settings";
import styles from "./footer.module.scss";
import CustomButton from "../../../Components/CustomButton";

function Footer() {
  const [isSettings, setIsSettings] = useState<boolean>(false);

  const onChangeVisible = () => {
    setIsSettings(false)
  }

  return (
    <footer className={styles.footer}>
      
      {isSettings && <Settings onChangeVisible={onChangeVisible}/>}
      
        <button className={styles.footer__button} onClick={() => setIsSettings(prev=>!prev)}>
          <img src="/img/settings.png" alt="settings" />
        </button>
     
    </footer>
  );
}

export default Footer;
