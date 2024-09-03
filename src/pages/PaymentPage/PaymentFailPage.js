import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import alertSign from '../../images/alertSign.png';
import styles from '../../css/PaymentFailPage.module.css';
import Button from '../../components/Button';

function PaymentFailPage(props) {
  const navigator = useNavigate();
  const onClick = () => {
    navigator("/");
    window.location.reload();
  }

  return (
    <div>
      <Header />
      <div className={styles.imgBox}>
        <img src={alertSign} alt="결제 실패" className={styles.alertSign}/>
      </div>
      <div className={styles.failText}>결제가 실패했습니다😢</div>
      <Button onClick={onClick} buttonColor="#FF5555" buttonText="확인" />
    </div>
  );
}

export default PaymentFailPage;