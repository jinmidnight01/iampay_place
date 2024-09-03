import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Webcam from "react-webcam";
import styles from "../../css/CameraPage.module.css";
import axios from "axios";
import hostURL from "../../hostURL";
import MirrorImage from "../../components/MirrorImage";
import Loading from "../../components/Loading";

const CameraPage = () => {
  const output = useLocation().state;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const paymentSubmit = async (image_Src) => {
    const response = await fetch(image_Src);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      MirrorImage(reader.result, (mirroredBlob) => {
        const formData = new FormData();
        formData.append("user_photo", mirroredBlob);
        formData.append("price", output.price);
        formData.append("user_name", output.user_name);
        formData.append("payments_date", output.payments_date);
        formData.append("is_done", output.is_done);
        formData.append("place_name", output.place_name);
        formData.append("user_id", output.user_id);

        // submit payment data
        axios
          .post(`${hostURL}/api/payments`, formData)
          .then(() => {
            navigate("/paymentsuccess");
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      });
    };
  };

  // useEffect(() => {
  //   if (output === null) {
  //     navigate("/priceinput");
  //   }
  // });

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.webcamBox}>
          <Webcam mirrored={true} className={styles.webcam} screenshotQuality={1}>
            {({ getScreenshot }) => (
              <div className={styles.buttonBox}>
                <button
                  onClick={() => {
                    const image_Src = getScreenshot();
                    paymentSubmit(image_Src);
                  }}
                  className={styles.button}
                >
                  완료
                </button>
              </div>
            )}
          </Webcam>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
