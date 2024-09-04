import React from 'react';
import Header from "../../components/Header";
import iampayLogo from "../../images/iampayLogo.png";
import styles from "../../css/LandingPage.module.css";
import Button from "../../components/Button";

function LandingPage() {
  return (
    <div>
      <Header />
      <div className={styles.logoBox}>
        <img className={styles.Logo} src={iampayLogo} alt="Logo" />
      </div>
      <div className={styles.buttonBoxes}>
        <Button buttonLink="/priceinput" buttonColor="#FF5555" buttonText="결제하기" />
        <Button buttonLink="/record" buttonColor="#67645D" buttonText="내역확인" />
      </div>
    </div>
  );
}

export default LandingPage;
