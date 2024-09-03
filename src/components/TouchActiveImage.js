import { React, useState } from "react";
import styles from "../css/TouchActive.module.css";
import leftVector from "../images/leftVector.png";

const TouchActiveImage = (props) => {
  const { onClick } = props;
  const [isActive, setIsActive] = useState(false);

  const handleTouchStart = () => {
    setIsActive(true); // 터치 시작 시 active 상태 설정
  };

  const handleTouchEnd = () => {
    setIsActive(false); // 터치 종료 시 active 상태 해제
  };

  const handleTouchCancel = () => {
    setIsActive(false); // 터치 취소 시 active 상태 해제
  };

  const handleMouseDown = () => {
    setIsActive(true); // 클릭 시 active 상태 설정
  };

  const handleMouseUp = () => {
    setIsActive(false); // 클릭 해제 시 active 상태 해제
  };

  return (
    <td
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={isActive && styles.active}
      onClick={onClick}
    >
      <img className={styles.leftVector} src={leftVector} alt="지우기" />
    </td>
  );
};

export default TouchActiveImage;
