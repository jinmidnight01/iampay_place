import React from "react";
import styles from "../css/Modal.module.css";

const Modal = ({ show, onDelete, onClose, paymentInfo }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>결제를 취소하시겠습니까?</h2>
          <div className={styles.contentBox}>
            <div>
              • <span className={styles.content}>주문일자</span>:{" "}
              <span>{paymentInfo.date.substr(5, 2)}</span>.
              <span>{paymentInfo.date.substr(8, 2)}</span>&nbsp;
              <span>{paymentInfo.date.substr(11, 5)}</span>
            </div>
            {/* <div>
              • <span className={styles.content}>이름</span>:{" "}
              {paymentInfo.username.substr(0, 1)}X
              {paymentInfo.username.substr(2, 1)}
            </div> */}
            <div>
              • <span className={styles.content}>가격</span>:{" "}
              {Number(paymentInfo.price).toLocaleString()}원
            </div>
          </div>
          <div className={styles.cancelButtonBox}>
            <button onClick={onDelete} className={styles.buttonYes}>
              네
            </button>
            <button onClick={onClose} className={styles.buttonNo}>
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
