import React from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import styles from "../../css/NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <Header/>
      <div className={styles.content}>
        해당 주소는 <br/>존재하지 않는 페이지입니다
      </div>
      <Button buttonLink="/" buttonColor="#FF5555" buttonText="홈으로" />
    </div>
  );
};

export default NotFoundPage;
