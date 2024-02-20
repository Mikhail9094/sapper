import { useNavigate } from "react-router-dom";
import styles from "./tablePlayers.module.scss";


function TablePlayers() {
    const navigate = useNavigate()
  return (
    <div className={styles.hello}>
     <h1> Привет.</h1> 
      <button onClick={()=>navigate("/")}>вернуться к игре</button>
    </div>
  )
}

export default TablePlayers
