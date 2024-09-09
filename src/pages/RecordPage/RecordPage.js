import React, { useState, useEffect } from "react";
import Select from "react-select";
import hostURL from "../../hostURL";
import axios from "axios";
import Header from "../../components/Header";
import styles from "../../css/RecordPage.module.css";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const RecordPage = () => {
  const [paymentsData, setPaymentsData] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);

  // 결제 데이터를 API에서 가져오기
  useEffect(() => {
    axios
      .get(`${hostURL}/api/payments`)
      .then((response) => {
        setPaymentsData(response.data.payments);
      })
      .catch((error) => {
        console.error("Error fetching payment data:", error);
      });
  }, []);

  // 월 선택 핸들러
  const handleMonthChange = (selectedOptions) => {
    setSelectedMonths(selectedOptions.map((option) => option.value));
  };

  // 일 선택 핸들러
  const handleDayChange = (selectedOptions) => {
    setSelectedDays(selectedOptions.map((option) => option.value));
  };

  // 결제 데이터 필터링 함수
  const filterPayments = () => {
    return paymentsData
      .sort((a, b) => {
        if (a.payments_date > b.payments_date) return -1;
        if (a.payments_date < b.payments_date) return 1;
        return 0;
      })
      .filter((payment) => {
        const paymentMonth = payment.payments_date.split("-")[1];
        const paymentDay = payment.payments_date.split("-")[2].substring(0, 2);
        const monthMatch =
          selectedMonths.length === 0 || selectedMonths.includes(paymentMonth);
        const dayMatch =
          selectedDays.length === 0 || selectedDays.includes(paymentDay);
        return monthMatch && dayMatch;
      });
  };

  const filteredPayments = filterPayments();

  // 월, 일 필터링 옵션
  const monthOptions = Array.from({ length: 5 }, (_, i) => ({
    value: String(i + 8).padStart(2, "0"), // 8월부터 시작
    label: `${i + 8}월`,
  }));

  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: `${i + 1}일`,
  }));

  // 총 매출 계산
  let totalPrice = 0;
  filteredPayments.map((payment) => {
    totalPrice += Number(payment.price);
  });

  // delete payment
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({});
  const openModal = (info) => {
    setPaymentInfo(info);
    setIsModalOpen(true);
  };
  const closeModal = (info) => {
    onDelete(info.paymentId, info.userId, info.price);
    setIsModalOpen(false);
    setPaymentInfo({});
  };
  const onDelete = (payments_id, user_id, price) => {
    axios
      .delete(`${hostURL}/api/payments/${payments_id}`)
      .then((response) => {
        axios
          .patch(`${hostURL}/api/users/${user_id}/spend?price=-${price}`)
          .then((response) => {
            axios
              .get(`${hostURL}/api/payments`)
              .then((response) => {
                setPaymentsData(response.data.payments);
              })
              .catch((error) => {
                console.error(error);
              });
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Header />

      <div className={styles.upperBox}>
        <div>
        <div className={styles.priceTitle}>
          선입금: <span>300,000</span>원
        </div>
        <div className={styles.priceTitle}>
          매출: <span>{totalPrice.toLocaleString()}</span>원
        </div>
        </div>

        <div className={styles.selectBox}>
          <div className={styles.selectContent}>
            <Select
              isMulti
              options={monthOptions}
              onChange={handleMonthChange}
              placeholder="월을 선택해주세요"
              className={styles.select}
            />
          </div>

          <div className={styles.selectContent}>
            <Select
              isMulti
              options={dayOptions}
              onChange={handleDayChange}
              placeholder="일을 선택해주세요"
              className={styles.select}
            />
          </div>
        </div>
      </div>

      <div className={styles.modalBox}>
        <Modal
          show={isModalOpen}
          onDelete={() =>
            closeModal({
              paymentId: paymentInfo.paymentId,
              userId: paymentInfo.userId,
              price: paymentInfo.price,
            })
          }
          onClose={() => setIsModalOpen(false)}
          paymentInfo={paymentInfo}
        />
      </div>

      <div className={styles.recordBox}>
        <div className={styles.recordHeader}>
          <div className={styles.recordBlock}>주문일자</div>
          <div className={styles.recordBlock}>금액</div>
        </div>
        <hr />
        <div className={styles.recordBody}>
          {filteredPayments.map((payment) => (
            <div
              onClick={() =>
                openModal({
                  paymentId: payment.payments_id,
                  userId: payment.user_id,
                  date: payment.payments_date,
                  username: payment.user_name,
                  price: payment.price,
                })
              }
              className={styles.recordRow}
              key={payment.payments_id}
            >
              <div className={styles.recordBlock}>
                <span>{payment.payments_date.substr(5, 2)}</span>.
                <span>{payment.payments_date.substr(8, 2)}</span>&nbsp;
                <span>{payment.payments_date.substr(11, 5)}</span>
              </div>
              <div className={styles.recordBlock}>
                {Number(payment.price).toLocaleString()}원
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button buttonLink="/" buttonColor="#FF5555" buttonText="돌아가기" />
    </div>
  );
};

export default RecordPage;
