import { React, useState } from "react";
import Header from "../../components/Header";
import styles from "../../css/PriceInputPage.module.css";
import Button from "../../components/Button";
import axios from "axios";
import hostURL from "../../hostURL";
import { useNavigate } from "react-router-dom";
import TouchActive from "../../components/TouchActive";
import TouchActiveImage from "../../components/TouchActiveImage";

function PriceInputPage(props) {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0);
  const onClick = (e) => {
    setPrice(price * 10 + parseInt(e.target.getAttribute("value")));
  };
  const onDelete = (e) => {
    setPrice(parseInt(price / 10));
  };
  const handleSubmit = (e) => {
    if (price === 0) {
      alert("금액을 입력해주세요");
      return;
    }

    const submitInputs = {
      price: price.toString(),
      store_id: 0
    };

    axios
      .post(`${hostURL}/api/payments`, submitInputs)
      .then((res) => {
        navigate("/camera", { state: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className={styles.priceInputGuide}>금액을 입력해주세요</div>
      <div className={styles.priceInput}>
        <div className={styles.changedInput}>{price.toLocaleString()}</div>
        <span className={styles.fixedInput}>원</span>
      </div>
      <table>
        <tr>
          <TouchActive value="1" onClick={onClick} />
          <TouchActive value="2" onClick={onClick} />
          <TouchActive value="3" onClick={onClick} />
        </tr>
        <tr>
          <TouchActive value="4" onClick={onClick} />
          <TouchActive value="5" onClick={onClick} />
          <TouchActive value="6" onClick={onClick} />
        </tr>
        <tr>
          <TouchActive value="7" onClick={onClick} />
          <TouchActive value="8" onClick={onClick} />
          <TouchActive value="9" onClick={onClick} />
        </tr>
        <tr>
          <th></th>
          <TouchActive value="0" onClick={onClick} />
          <TouchActiveImage onClick={onDelete} />
        </tr>
      </table>
      <Button
        onClick={handleSubmit}
        buttonLink=""
        buttonColor="#FF5555"
        buttonText="확인"
      />
    </div>
  );
}

export default PriceInputPage;
