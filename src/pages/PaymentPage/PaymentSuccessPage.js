import { React, useEffect } from "react";
import Header from "../../components/Header";
import styles from "../../css/PaymentSuccessPage.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import checkSign from "../../images/checkSign.png";
import emailjs from "@emailjs/browser";

function PaymentSuccessPage(props) {
  // const output = useLocation().state;
  const navigate = useNavigate();

  useEffect(() => {
    // 이메일 전송 코드
    emailjs
      .send(
        "service_i16qvnw", // emailjs 서비스 ID
        "template_svp624h", // emailjs 템플릿 ID
        {
          message: "", // 메일로 보낼 정보
        },
        "SXuCeO5u6o08tXRIo" // emailjs 공용 API 키
      )
      .then(
        () => {},
        (error) => {
          console.error("메일 전송 실패...", error);
        }
      );

    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 4000);
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className={styles.imgBox}>
        <img src={checkSign} alt="결제 성공" className={styles.checkSign} />
      </div>
      <div className={styles.successText}>
        {/* <span>{output.user_name.substr(0,1)}</span>X<span>{output.user_name.substr(2)}</span>님<br/> */}
        결제가 완료되었습니다
        <br />
      </div>
    </div>
  );
}

export default PaymentSuccessPage;
