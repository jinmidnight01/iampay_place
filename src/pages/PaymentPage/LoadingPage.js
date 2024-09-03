import { React, useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import rolling_white from "../../images/rolling_white.gif";
import axios from "axios";
import styles from "../../css/LoadingPage.module.css";
import hostURL from "../../hostURL";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/Button";

function LoadingPage(props) {
  const location = useLocation();
  const output = useMemo(() => location.state || {}, [location.state]);
  const navigate = useNavigate();
  const [intervalId, setIntervalId] = useState(null);

  // REST API: get payment result
  // useEffect(() => {
  //   setInterval(() => {
  //     axios
  //       .get(`${hostURL}/api/payments/${output.payments_id}`)
  //       .then((response) => {
  //         // 결제 성공시
  //         if (response.data.is_done) {
  //           navigate("/paymentsuccess", {
  //             state: {
  //               user_name: response.data.user_name,
  //             },
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         // 결제 실패시
  //         console.log(error);
  //         navigate("/paymentfail");
  //       });
  //   }, 1000);
  // }, [navigate, output]);

  // const cancelPayment = () => {
  //   if (intervalId) {
  //     clearInterval(intervalId); // 결제 취소 시 interval 정리
  //     setIntervalId(null);
  //   }

  //   if (!output.payments_id) {
  //     console.error("No payments_id found");
  //     return;
  //   }

  //   axios
  //     .delete(`${hostURL}/api/payments/${output.payments_id}`)
  //     .then(() => {
  //       // 결제 취소 성공 시 원하는 페이지로 이동
  //       navigate("/paymentfail");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // 결제 취소 실패 시 에러 처리
  //     });
  // };

  // REST API: get payment result
  // useEffect(() => {
  //   if (!output.payments_id) {
  //     console.error("No payments_id found");
  //     return;
  //   }

  //   const id = setInterval(() => {
  //     axios
  //       .get(`${hostURL}/api/payments/${output.payments_id}`)
  //       .then((response) => {
  //         // 결제 성공 시
  //         if (response.data.is_done) {
  //           clearInterval(id);
  //           navigate("/paymentsuccess", {
  //             state: {
  //               user_name: response.data.user_name,
  //             },
  //           });
  //         }
  //       })
  //       .catch((error) => {
  //         // 결제 실패 시
  //         clearInterval(id);
  //         console.log(error);
  //         navigate("/paymentfail");
  //       });
  //   }, 1000);

  //   setIntervalId(id);

  //   return () => clearInterval(id); // 컴포넌트가 언마운트될 때 interval 정리
  // }, [navigate, output]);

  // REST API: get payment result
  useEffect(() => {
    // payments_id가 유효한 경우에만 setInterval 실행
    if (output && output.payments_id) {
      const id = setInterval(() => {
        axios
          .get(`${hostURL}/api/payments/${output.payments_id}`)
          .then((response) => {
            // 결제 성공 시
            if (response.data.is_done) {
              clearInterval(id);
              navigate("/paymentsuccess", {
                state: {
                  user_name: response.data.user_name,
                },
              });
            }
          })
          .catch((error) => {
            // 결제 실패 시
            clearInterval(id);
            console.error(error);
            navigate("/paymentfail");
          });
      }, 1000);

      setIntervalId(id);

      // 컴포넌트가 언마운트될 때 interval 정리
      return () => clearInterval(id);
    } else {
      console.error("Invalid output or payments_id is missing");
    }
  }, [navigate, output]);

  // 결제 취소 함수
  const cancelPayment = () => {
    if (intervalId) {
      clearInterval(intervalId); // 결제 취소 시 interval 정리
      setIntervalId(null);
    }

    // payments_id가 유효한 경우에만 결제 취소 요청
    if (output && output.payments_id) {
      axios
        .delete(`${hostURL}/api/payments/${output.payments_id}`)
        .then(() => {
          // 결제 취소 성공 시 원하는 페이지로 이동
          navigate("/paymentfail");
        })
        .catch((error) => {
          console.error(error);
          // 결제 취소 실패 시 에러 처리
        });
    } else {
      console.error("Invalid output or payments_id is missing");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.loadingBox}>
        <img src={rolling_white} alt="로딩 중..." width="10%" />
        <div className={styles.loadingText}>결제 중</div>
      </div>
      {/* <Button
        onClick={cancelPayment}
        buttonColor="#FF5555"
        buttonText="결제취소"
      /> */}
    </div>
  );
}

export default LoadingPage;
