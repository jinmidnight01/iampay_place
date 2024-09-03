import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Button.module.css";

function Button(props) {
  const { buttonLink, buttonColor, buttonText, onClick } = props;

  return (
    <div className={styles.buttonTotalBox}>
      <div className={styles.buttonBox}>
        <Link to={buttonLink} className={styles.buttonLink}>
          <button
            onClick={onClick}
            className={styles.button}
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Button;
